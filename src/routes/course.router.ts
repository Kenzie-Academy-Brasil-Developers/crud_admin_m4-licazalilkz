import { Router } from "express";
import {
  createCourseController,
  createUserController,
  showCourseController,
  showUserCoursesController,
  userDeleteCourseController,
} from "../controllers";
import {
  tokenAdmin,
  tokenIsValid,
  validateId,
  validatedBody,
} from "../middlewares";
import { createCourseSchema } from "../schemas/course.schema";

export const courseRouter: Router = Router();

courseRouter.get("/", showCourseController);

courseRouter.post(
  "/",
  tokenIsValid,
  tokenAdmin,
  validatedBody(createCourseSchema),
  createCourseController
);

courseRouter.use(
  "/:courseId/users/:userId",
  tokenIsValid,
  tokenAdmin,
  validateId("params", "courseId", "courses", "User/course not found"),
  validateId("params", "courseId", "courses", "User/course not found")
);
courseRouter.post("/:courseId/users/:userId", createUserController);

courseRouter.delete("/:courseUd/users/:userId", userDeleteCourseController);
courseRouter.use(
  "/:courseId/users",
  tokenIsValid,
  tokenAdmin,
  validateId("params", "courseId", "courses", "User/course not found")
);
courseRouter.get("/:courseId/users", showUserCoursesController);
