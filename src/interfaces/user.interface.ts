import { QueryResult } from "pg";
import { z } from "zod";
import {
  createUserSchema,
  userPassword,
  userSchema,
} from "../schemas/user.schema";

export type User = z.infer<typeof userSchema>;
export type UserRequest = z.infer<typeof createUserSchema>;
export type UserReturn = z.infer<typeof userPassword>;
export type UserResult = QueryResult<User>;
