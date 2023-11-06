import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const validatedBody =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const validate = schema.parse(req.body);

    req.body = validate;

    return next();
  };
