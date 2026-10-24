import { updateSeatStatus } from "./show.service";
import { Router } from "express";
import * as ShowController from "./show.controller";

const showRouter = Router();

showRouter.post("/", ShowController.createShow);
showRouter.get("/", ShowController.getShowsByMovieDateLocation);
showRouter.get("/:id", ShowController.getShowById);

export default showRouter;
