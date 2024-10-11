import { Router } from "express";
import * as Couponcontroller from "./coupon.controller.js";
import { auth } from "../../middlewave/auth.js";
import { endpoint } from "./coupon.role.js";
import { asyncHandler } from "../../utls/catchError.js";

const router = Router();
router.post('/create',auth(endpoint.create),asyncHandler(Couponcontroller.create));
export default router;