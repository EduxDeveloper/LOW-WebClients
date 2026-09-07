import express from "express";
import loginClientController from "../controllers/loginClientController.js";
import verifyClientToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(loginClientController.login);
router.route("/me").get(verifyClientToken, loginClientController.me);
router.route("/logout").post(loginClientController.logout);

export default router;
