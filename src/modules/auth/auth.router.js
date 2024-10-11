import { Router } from "express";
import * as AuthController from "./auth.controller.js";
import { checkEmail } from "../../middlewave/ckeckEmail.js";
import { asyncHandler } from "../../utls/catchError.js";

const router = Router();
router.post('/register',checkEmail,asyncHandler(AuthController.register));
router.post('/login',asyncHandler(AuthController.login));
router.patch('/sendcode',asyncHandler(AuthController.SendCode));
router.patch('/forgetpassword',asyncHandler(AuthController.forgetpassword));
router.get('/comfirmEmail/:email',asyncHandler(AuthController.comfirmEmail));
export default router;