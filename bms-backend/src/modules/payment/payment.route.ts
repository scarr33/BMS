import { Router } from "express";
import * as PaymentController from "./payment.controller";
import { isVerifiedUser } from "../../middlewares/auth.middleware";

const paymentRouter = Router();

paymentRouter.post(
  "/create-order",
  isVerifiedUser,
  PaymentController.createOrder,
);
paymentRouter.post(
  "/verify-payment",
  isVerifiedUser,
  PaymentController.verifyPayment,
);

export default paymentRouter;
