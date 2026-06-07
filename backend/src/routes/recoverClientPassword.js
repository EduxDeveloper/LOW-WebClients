import express from "express";
import recoverClientPasswordController from "../controllers/recoverClientPasswordController.js";

const router = express.Router();

router.route("/sendRecoveryCode").post(recoverClientPasswordController.sendRecoveryCode);
router.route("/verifyCode").post(recoverClientPasswordController.verifyCode);
router.route("/resetPassword").post(recoverClientPasswordController.resetPassword);

export default router;
