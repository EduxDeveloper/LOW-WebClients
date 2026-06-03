import express from 'express';
import registerEmployeeController from '../controllers/registerEmployeeController.js';

const router = express.Router();

router.route("/")
    .post(registerEmployeeController.register);

router.route("/verifyCode")
    .post(registerEmployeeController.confirm);

export default router;