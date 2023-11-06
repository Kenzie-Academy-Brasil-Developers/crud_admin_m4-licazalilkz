import { Request, Response } from "express";
import {
  createCourseService,
  showCourseService,
  showUserCoursesService,
  userDeleteCourseService,
  userToCourseService,
} from "../services";

export const createCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const course = await createCourseService(req.body);
  return res.status(201).json(course);
};

export const userToCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId, courseId } = req.params;

  await userToCourseService(userId, courseId);

  return res
    .status(201)
    .json({ message: "User successfully vinculed to course" });
};

export const userDeleteCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId, courseId } = req.params;
  await userDeleteCourseService(userId, courseId);
  return res.status(204).json();
};

export const showCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const course = await showCourseService();
  return res.status(200).json(course);
};

export const showUserCoursesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const courseUsers = await showUserCoursesService(req.params.courseId);
  return res.status(200).json(courseUsers);
};
