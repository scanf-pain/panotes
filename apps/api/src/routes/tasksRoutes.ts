import * as express from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controlers/taskControler";
import authentify from "../middleware/autentify";
import authorize from "../middleware/authorize";

const tasksRouter = express.Router();

tasksRouter.get("/", authentify, authorize(["user"]), getTasks);

tasksRouter.get("/:id", authentify, authorize(["user"]), getTask);

tasksRouter.post("/", authentify, authorize(["user"]), createTask);

tasksRouter.patch("/:id", authentify, authorize(["user"]), updateTask);

tasksRouter.delete("/:id", authentify, authorize(["user"]), deleteTask);

export default tasksRouter;
