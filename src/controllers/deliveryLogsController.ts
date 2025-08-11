import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import z from "zod";

class DeliveryLogsController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            delivery_id: z.string().uuid(),
            description: z.string()
        })

        const { delivery_id, description } = bodySchema.parse(request.body);

        const delivery = await prisma.delivery.findUnique({
            where: {
                id: delivery_id
            }
        })

        if (!delivery) {
            throw new AppError("Delivery not found", 404);
        }

        if (delivery.status === 'processing') {
            throw new AppError("Change status to shipped", 400);
        }

        await prisma.deliveryLog.create({
            data: {
                deliveryId: delivery_id,
                description
            }
        })

        return response.status(201).json()
    }

    async show(request: Request, response: Response) {
        const paramsSchema = z.object({
            delivery_id: z.string().uuid()
        })

        const {delivery_id} = paramsSchema.parse(request.params);

        const delivery = await prisma.delivery.findUnique({
            where: {
                id: delivery_id
            }
        })

      
        if(request.user?.role === 'customer' && delivery?.userId !== request.user.id) {
            throw new AppError("The user can only view their deliveries", 401);
        }

        response.json(delivery);
    }

}

export { DeliveryLogsController };