import * as express from "express";
import type { NextFunction, Request, Response } from "express";
import { NotFoundError } from "./helpers/error";

import * as cors from "cors";
import * as cookieParser from "cookie-parser";

import errorHandler from "./middleware/errorHandler";

import authRouter from "./routes/authRoutes";
import userRouter from "./routes/usersRoutes";
import tasksRouter from "./routes/tasksRoutes";
import notesRouter from "./routes/notesRoutes";

// dotenv load

import * as dotenv from "dotenv";
import accountRouter from "./routes/accountRoutes";
dotenv.config();

// app

const app = express();

// middleware

app.use(express.json({ limit: "10kb" }));

app.use(cookieParser());

const { CORS_ORIGIN } = process.env;

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

// routes

app.get("/", (_request: Request, response: Response) => {
  response.status(200).send("Hi there");
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/notes", notesRouter);
app.use("/categories", tasksRouter);
app.use("/tasks", tasksRouter);
app.use("/account", accountRouter);

app.get("*", (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError("Route not found"));
});

// handle errors

app.use(errorHandler);

// activate server

const { PORT = "8000" } = process.env;
const port = PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
