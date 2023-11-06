import { QueryResult } from "pg";
import { z } from "zod";
import { courseSchema, createCourseSchema } from "../schemas/course.schema";

export type Course = z.infer<typeof courseSchema>;
export type CourseRequest = z.infer<typeof createCourseSchema>;
export type CourseResult = QueryResult<Course>;
