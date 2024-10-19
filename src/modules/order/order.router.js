import { Router } from "express";
import { auth } from "../../middlewave/auth.js";
import { endpoint } from "./order.role.js";
import * as orderController from "./order.controller.js";
import { asyncHandler } from "../../utls/catchError.js";
import { validation } from "../../middlewave/validation.js";
import * as schema from "./order.validation.js";
const router = Router();
router.post('/',validation(schema.createOrderSchema),auth(endpoint.create),asyncHandler(orderController.create) );
router.get('/all',auth(endpoint.getall),asyncHandler(orderController.getall));
router.get('/',auth(endpoint.get),asyncHandler(orderController.get));
router.patch('/changeStatus/:orderId',validation(schema.changeStatusSchema),auth(endpoint.changeStatus),asyncHandler(orderController.changeStatus));
export default router;