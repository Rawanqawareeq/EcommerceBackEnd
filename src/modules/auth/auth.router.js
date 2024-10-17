import { Router } from "express";
import * as AuthController from "./auth.controller.js";
import { checkEmail } from "../../middlewave/ckeckEmail.js";
import { asyncHandler } from "../../utls/catchError.js";
import { validation } from "../../middlewave/validation.js";
import * as schema from "./auth.validation.js";

const router = Router();
router.post('/register',validation(schema.registerSchema),checkEmail,asyncHandler(AuthController.register));
router.post('/login',asyncHandler(AuthController.login));
router.patch('/sendcode',validation(schema.sendCodeSchema),asyncHandler(AuthController.SendCode));
router.patch('/forgetpassword',validation(schema.forgetpassword),asyncHandler(AuthController.forgetpassword));
router.get('/comfirmEmail/:email',asyncHandler(AuthController.comfirmEmail));
export default router;