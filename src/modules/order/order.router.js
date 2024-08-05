import { Router } from "express";
import { auth } from "../../middlewave/auth.js";
import { endpoint } from "./order.role.js";
import * as orderController from "./order.controller.js";

const router = Router();
router.post('/',auth(endpoint.create),orderController.create);
router.get('/all',auth(endpoint.getall),orderController.getall);
router.get('/',auth(endpoint.get),orderController.get);
router.patch('/changeStatus/:orderId',auth(endpoint.changeStatus),orderController.changeStatus);
export default router;