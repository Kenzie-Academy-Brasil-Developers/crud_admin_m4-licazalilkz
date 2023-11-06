import { z } from "zod";
import { sessionSchema } from "../schemas/session.schema";

export type LoginRequest = z.infer<typeof sessionSchema>;
