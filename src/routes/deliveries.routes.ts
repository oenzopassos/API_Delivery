import { Router } from "express";
import { DeliveriesController } from "@/controllers/deliveriesController";
import { ensureAutheticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { DeliveriesStatusController } from "@/controllers/deliveriesStatusController";
const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();
const deliveriesStatusController = new DeliveriesStatusController();

deliveriesRoutes.use(ensureAutheticated, verifyUserAuthorization(["sale"]));
deliveriesRoutes.post("/", deliveriesController.create);
deliveriesRoutes.get("/", deliveriesController.index);
deliveriesRoutes.patch("/:id/status", deliveriesStatusController.update); 

export { deliveriesRoutes }