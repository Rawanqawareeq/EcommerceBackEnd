import { Router } from "express";
import * as CartController from "./cart.controller.js";
import { auth } from "../../middlewave/auth.js";
import { endpoint } from "./cart.role.js";
import { asyncHandler } from "../../utls/catchError.js";
import { validation } from "../../middlewave/validation.js";
import * as schema from "./cart.validation.js";

const router = Router();
router.get('/',auth(endpoint.cart),asyncHandler(CartController.getcart));
router.post('/',validation(schema.createCartSchema ),auth(endpoint.cart),asyncHandler(CartController.create));
router.put('/updateQuantity/:id',validation(schema.updateQuantitySchema),auth(endpoint.cart),asyncHandler(CartController.updateQuantity));
router.put('/:id',validation(schema.deleteProductSchema),auth(endpoint.cart),validation(schema.deleteProductSchema),asyncHandler(CartController.deleteproduct));
router.put('/clearcart',auth(endpoint.cart),asyncHandler(CartController.remove));


export default router;