import express from "express";
import MovieRouter from "../modules/movie/movie.route";

const router = express.Router();

router.use("/movies", MovieRouter);

export default router;
