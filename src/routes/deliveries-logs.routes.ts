import {Router} from 'express';
import { DeliveryLogsController } from '@/controllers/deliveryLogsController';
import { ensureAutheticated } from '@/middlewares/ensureAuthenticated';
import { verifyUserAuthorization } from '@/middlewares/verifyUserAuthorization';

const deliveryLogsRoutes = Router();
const deliveryLogsController = new DeliveryLogsController();

deliveryLogsRoutes.post("/", ensureAutheticated, verifyUserAuthorization(["sale"]),deliveryLogsController.create);
deliveryLogsRoutes.get("/:delivery_id/show", ensureAutheticated, verifyUserAuthorization(["sale", "customer"]), deliveryLogsController.show);

export { deliveryLogsRoutes };