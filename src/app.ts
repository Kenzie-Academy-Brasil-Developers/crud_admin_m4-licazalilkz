import express, { Application, json } from "express";
import "express-async-errors";
import { courseRouter, loginRouter, userRouter } from "./routes";
import { handleError } from "./middlewares";

const app: Application = express();
app.use(json());

app.use("/login", loginRouter);
app.use("/users", userRouter);
app.use("/courses", courseRouter);

app.use(handleError);
export default app;
