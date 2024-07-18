import { Router } from "express";
import * as productcontroller from "./product.controller.js";
import {auth} from '../../middlewave/auth.js';
import flieUpload, { fileType } from "../../utls/multer.js";
import { endpoint } from "./product.role.js";

const router = Router();

router.post('/',auth(endpoint.create),flieUpload(fileType.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImage',maxCount:5},
]),productcontroller.create);
export default router;