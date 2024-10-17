import { Router } from "express";
import * as Couponcontroller from "./coupon.controller.js";
import { auth } from "../../middlewave/auth.js";
import { endpoint } from "./coupon.role.js";
import { asyncHandler } from "../../utls/catchError.js";
import { validation } from "../../middlewave/validation.js";
import * as schema from "./coupon.validation.js";

const router = Router();

router.post('/create',validation(schema.creatCouponSchema),auth(endpoint.create),asyncHandler(Couponcontroller.create));
export default router;