import { Router } from "express";
import * as productcontroller from "./product.controller.js";
import {auth} from '../../middlewave/auth.js';
import flieUpload, { fileType } from "../../utls/multer.js";
import { endpoint } from "./product.role.js";
import ReviewRouter  from "../review/review.router.js";
import { asyncHandler } from "../../utls/catchError.js";
import { validation } from "../../middlewave/validation.js";
import * as schema  from "./product.validation.js";

const router = Router();
router.use('/:productId/review',asyncHandler(ReviewRouter));
router.post('/',flieUpload(fileType.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImage',maxCount:5},
]),auth(endpoint.create),productcontroller.create);
router.get('/',auth(endpoint.get),asyncHandler(productcontroller.get));
export default router;