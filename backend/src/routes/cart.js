import express from "express";
import cartController from "../controllers/cartController.js";


const router = express.Router();

router.route("/")
.get(cartController.getAllCarts)
.post(cartController.insertCart);

router.route("/client/:clientId")
.get(cartController.getCartByClient);

router.route("/sync")
.post(cartController.syncCart);

router.route("/:id")
.put(cartController.updateCart)
.delete(cartController.deleteCart);

export default router;