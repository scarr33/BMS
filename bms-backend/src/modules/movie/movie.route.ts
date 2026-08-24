import express from "express";
import * as MovieController from "./movie.controller";
import { validate } from "../../middlewares/validate";
import { MovieSchema } from "./movie.validation";

const movieRouter = express.Router();

movieRouter.post("/", validate(MovieSchema), MovieController.createMovie);
movieRouter.get("/", MovieController.getMovies);
movieRouter.get("/recommended", MovieController.getTopRecommendedMovies);
movieRouter.get("/:id", MovieController.getMovieById);

export default movieRouter;
