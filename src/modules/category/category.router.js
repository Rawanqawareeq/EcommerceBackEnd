import { Router } from "express";
import flieUpload, { fileType } from "../../utls/multer.js";
import * as CtegoryController from "./category.controller.js";
import { auth } from "../../middlewave/auth.js";
import subcategoryRouter from "../subcategory/subcategory.router.js";
import { endPoint } from "./category.role.js";
const router = Router({caseSensitive:true});
router.use('/:id/subcategories',subcategoryRouter);
router.post('/',auth(endPoint.Create),flieUpload(fileType.image).single('image'),CtegoryController.CreateCategory);
router.get('/ActiveCategory',CtegoryController.getActive);
router.get('/',auth(endPoint.getAll),CtegoryController.getAll);
router.get('/:id',auth(endPoint.getDetails),CtegoryController.getDetails);
router.patch('/:id',auth(endPoint.update),flieUpload(fileType.image).single('image'),CtegoryController.update);
router.delete('/:id',auth(endPoint.delete),CtegoryController.deleteCategory);


export default router;