import { Request, Response } from "express";
import {
  createUserService,
  showUserCourseService,
  showUserService,
} from "../services";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await createUserService(req.body);
  return res.status(201).json(user);
};

export const showUserCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userCourses = await showUserCourseService(req.params.id);
  return res.status(200).json(userCourses);
};

export const showUserControler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await showUserService();
  return res.status(200).json(users);
};
