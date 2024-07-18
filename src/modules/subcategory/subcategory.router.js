import { Router } from "express";
import {auth} from '../../middlewave/auth.js'
import * as subcategorycontroller from "./subcategory.controller.js";
import flieUpload, { fileType } from "../../utls/multer.js";
import { endpoint } from "./subcategory.role.js";
const router = Router({mergeParams:true});
router.post('/',flieUpload(fileType.image).single('image'),auth(endpoint.create),subcategorycontroller.create);
router.get('/',subcategorycontroller.getAll);

export default router;