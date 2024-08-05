import { Router } from "express";
import * as Couponcontroller from "./coupon.controller.js";
import { auth } from "../../middlewave/auth.js";
import { endpoint } from "./coupon.role.js";

const router = Router();
router.post('/create',auth(endpoint.create),Couponcontroller.create);
export default router;