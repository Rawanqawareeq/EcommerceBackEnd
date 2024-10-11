import { Router } from "express";
import * as productcontroller from "./product.controller.js";
import {auth} from '../../middlewave/auth.js';
import flieUpload, { fileType } from "../../utls/multer.js";
import { endpoint } from "./product.role.js";
import ReviewRouter  from "../review/review.router.js";
import { asyncHandler } from "../../utls/catchError.js";

const router = Router();
router.use('/:productId/review',asyncHandler(ReviewRouter));
router.post('/',auth(endpoint.create),flieUpload(fileType.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImage',maxCount:5},
]),productcontroller.create);
router.get('/',auth(endpoint.get),asyncHandler(productcontroller.get));
export default router;