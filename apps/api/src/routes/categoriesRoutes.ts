import * as express from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controlers/categoryControler";
import authentify from "../middleware/autentify";
import authorize from "../middleware/authorize";

const categotyRouter = express.Router();

categotyRouter.get("/", authentify, authorize(["user"]), getCategories);

categotyRouter.get("/:id", authentify, authorize(["user"]), getCategory);

categotyRouter.post("/", authentify, authorize(["user"]), createCategory);

categotyRouter.patch("/:id", authentify, authorize(["user"]), updateCategory);

categotyRouter.delete("/:id", authentify, authorize(["user"]), deleteCategory);

export default categotyRouter;
