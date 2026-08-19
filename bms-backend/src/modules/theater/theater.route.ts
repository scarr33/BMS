import { TheaterSchema } from "./theater.validation";
import express from "express";
import * as TheaterController from "./theater.controller";
import { validate } from "../../middlewares/validate";

const theaterRouter = express.Router();

theaterRouter.post(
  "/",
  validate(TheaterSchema),
  TheaterController.createTheater,
);
theaterRouter.get("/", TheaterController.getTheaters);

export default theaterRouter;
