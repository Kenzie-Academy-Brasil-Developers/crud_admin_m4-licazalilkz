import { Router } from "express";
import {
  tokenAdmin,
  tokenIsValid,
  validateId,
  validatedBody,
  validatedEmail,
} from "../middlewares";
import { createUserSchema } from "../schemas/user.schema";
import {
  createUserController,
  showUserControler,
  showUserCourseController,
} from "../controllers";

export const userRouter: Router = Router();

userRouter.post(
  "/",
  validatedBody(createUserSchema),
  validatedEmail,
  createUserController
);

userRouter.use("/", tokenIsValid, tokenAdmin);
userRouter.get("/", showUserControler);
userRouter.get(
  "/:id/courses",
  tokenIsValid,
  tokenAdmin,
  validateId("params", "id", "users", "User not found."),
  showUserCourseController
);
