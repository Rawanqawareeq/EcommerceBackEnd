import { Router } from "express";
import * as CartController from "./cart.controller.js";
import { auth } from "../../middlewave/auth.js";
import { endpoint } from "./cart.role.js";

const router = Router();
router.get('/',auth(endpoint.cart),CartController.getcart);
router.post('/',auth(endpoint.cart),CartController.create);
router.put('/clearcart',auth(endpoint.cart),CartController.remove);
router.put('/:id',auth(endpoint.cart),CartController.deleteproduct);


export default router;