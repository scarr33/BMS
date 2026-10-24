import { Router } from "express";
import * as BookingController from "./booking.controller";
import { isVerifiedUser } from "../../middlewares/auth.middleware";

const bookingRouter = Router();

bookingRouter.post("/", isVerifiedUser, BookingController.createBookingHandler);
bookingRouter.get(
  "/",
  isVerifiedUser,
  BookingController.getUserBookingsHandler,
);

export default bookingRouter;
