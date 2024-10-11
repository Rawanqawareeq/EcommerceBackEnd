import { Router } from "express";
import { auth } from "../../middlewave/auth.js";
import { endpoint } from "./review.role.js";
import * as reviewController from "./review.controller.js";
import flieUpload, { fileType } from "../../utls/multer.js";
import { asyncHandler } from "../../utls/catchError.js";

const router = Router({mergeParams:true});
router.post('/',auth(endpoint.create),flieUpload(fileType.image).single('image'),asyncHandler(reviewController.create));
export default router;