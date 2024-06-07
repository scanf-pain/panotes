import * as express from "express";
import { login, refresh, logout } from "../controlers/authControler";

const authRouter = express.Router();

authRouter.post("/login", login);

authRouter.post("/refresh", refresh);

authRouter.post("/logout", logout);

export default authRouter;
