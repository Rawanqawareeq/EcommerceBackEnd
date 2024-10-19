import { Router } from "express";
import { auth } from "../../middlewave/auth.js";
import { endpoint } from "./review.role.js";
import * as reviewController from "./review.controller.js";
import flieUpload, { fileType } from "../../utls/multer.js";
import { asyncHandler } from "../../utls/catchError.js";
import { validation } from "../../middlewave/validation.js";
import * as schema from "./review.validation.js";

const router = Router({mergeParams:true});
router.post('/',validation(schema.createReviewschema),auth(endpoint.create),flieUpload(fileType.image).single('image'),asyncHandler(reviewController.create));
export default router;