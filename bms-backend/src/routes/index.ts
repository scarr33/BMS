import express from "express";
import MovieRouter from "../modules/movie/movie.route";
import theaterRouter from "../modules/theater/theater.route";

const router = express.Router();

router.use("/movies", MovieRouter);
router.use("/theaters", theaterRouter);

export default router;
