// import { crypto } from "crypto";
import Razorpay from "razorpay";
import { config } from "../../config/config";
import { IPaymentData, IVerifyPayment } from "./payment.interface";
import * as crypto from "crypto";

export const createOrder = async (paymentData: IPaymentData) => {
  const razorpay = new Razorpay({
    key_id: config.razorpayKey,
    key_secret: config.razorpaySecret,
  });

  const { amount } = paymentData;

  const option = {
    amount: amount * 100, //pass amount in paisa
    currency: "INR",
    receipt: `bms-ticket_${Date.now()}`,
  };

  const order = await razorpay.orders.create(option);

  return order;
};

export const verifyPayment = async (paymentData: IVerifyPayment) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    paymentData;

  const expectedSignature = crypto
    .createHmac("sha256", config.razorpaySecret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  return expectedSignature === razorpay_signature;
};
