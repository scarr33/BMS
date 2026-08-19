import express from "express";
import * as MovieController from "./movie.controller";
import { validate } from "../../middlewares/validate";
import { MovieSchema } from "./movie.validation";

const MovieRouter = express.Router();

MovieRouter.post("/", validate(MovieSchema), MovieController.createMovie);
MovieRouter.get("/", MovieController.getMovies);
MovieRouter.get("recommended", MovieController.getTopRecommendedMovies);
MovieRouter.get("/:id", MovieController.getMovieById);

export default MovieRouter;
