import { Router } from "express";
import * as AuthController from "./auth.controller.js";

const router = Router();
router.post('/register',AuthController.register)
router.post('/login',AuthController.login)
router.patch('/sendcode',AuthController.SendCode)
router.patch('/forgetpassword',AuthController.forgetpassword)
export default router;