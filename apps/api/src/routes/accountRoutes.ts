import * as express from "express";
import { getSelf, updateSelf, deletSelf } from "../controlers/accountControler";
import authentify from "../middleware/autentify";

const accountRouter = express.Router();

accountRouter.get("/", authentify, getSelf);

accountRouter.patch("/", authentify, updateSelf);

accountRouter.delete("/", authentify, deletSelf);

export default accountRouter;
