import { Router } from "express";
import { loginController } from "../controllers";
import { validatedBody } from "../middlewares";
import { sessionSchema } from "../schemas/session.schema";

export const loginRouter: Router = Router();

loginRouter.post("/", validatedBody(sessionSchema), loginController);
