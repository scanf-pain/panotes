import * as express from "express";
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controlers/noteControler";
import authentify from "../middleware/autentify";
import authorize from "../middleware/authorize";

const notesRouter = express.Router();

notesRouter.get("/", authentify, authorize(["user"]), getNotes);

notesRouter.get("/:id", authentify, authorize(["user"]), getNote);

notesRouter.post("/", authentify, authorize(["user"]), createNote);

notesRouter.patch("/:id", authentify, authorize(["user"]), updateNote);

notesRouter.delete("/:id", authentify, authorize(["user"]), deleteNote);

export default notesRouter;
