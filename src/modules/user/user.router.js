import { Router } from "express";
import { endpoint } from "./user.role.js";
import * as UserController from "./user.controller.js";
import { auth } from "../../middlewave/auth.js";

const router = Router();
router.get('/',auth(endpoint.getall),UserController.getUsers);
router.get('/userData',auth(endpoint.userData),UserController.userData);


export default router;