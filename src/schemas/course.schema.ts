import { z } from "zod";

export const courseSchema = z.object({
  id: z.number(),
  name: z.string().max(15),
  description: z.string(),
});

export const createCourseSchema = courseSchema.omit({
  id: true,
});
