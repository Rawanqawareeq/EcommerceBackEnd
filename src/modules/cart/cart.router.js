import { Router } from "express";
import * as CartController from "./cart.controller.js";
import { auth } from "../../middlewave/auth.js";
import { endpoint } from "./cart.role.js";
import { asyncHandler } from "../../utls/catchError.js";

const router = Router();
router.get('/',auth(endpoint.cart),asyncHandler(CartController.getcart));
router.post('/',auth(endpoint.cart),asyncHandler(CartController.create));
router.put('/clearcart',auth(endpoint.cart),asyncHandler(CartController.remove));
router.put('/updateQuantity/:id',auth(endpoint.cart),asyncHandler(CartController.updateQuantity));
router.put('/:id',auth(endpoint.cart),asyncHandler(CartController.deleteproduct));


export default router;