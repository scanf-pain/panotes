import * as express from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from "../controlers/userControler";
import authentify from "../middleware/autentify";
import authorize from "../middleware/authorize";

const userRouter = express.Router();

/* public route to create/register user */
userRouter.post("/", createUser);

userRouter.get("/", authentify, authorize(["admin"]), getAllUsers);

userRouter.get("/:id", authentify, authorize(["admin"]), getUser);

userRouter.patch("/:id", authentify, authorize(["admin"]), updateUser);

userRouter.delete("/:id", authentify, authorize(["admin"]), deleteUser);

export default userRouter;
