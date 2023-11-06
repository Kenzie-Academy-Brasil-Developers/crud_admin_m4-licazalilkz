import format from "pg-format";
import {
  Course,
  CourseRequest,
  CourseResult,
} from "../interfaces/course.interface";
import { client } from "../database";
import { AppError } from "../errors";

export const createCourseService = async (
  data: CourseRequest
): Promise<Course> => {
  const queryFormat: string = format(
    'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
    Object.keys(data),
    Object.values(data)
  );

  const query: CourseResult = await client.query(queryFormat);
  return query.rows[0];
};

export const userToCourseService = async (
  userId: string,
  courseId: string
): Promise<void> => {
  const queryString: string = `
    INSERT INTO "userCourses" ("userId","courseId")
    VALUES ($1, $2)
    RETURNING *;
`;

  await client.query(queryString, [userId, courseId]);
};

export const userDeleteCourseService = async (
  userId: string,
  courseId: string
): Promise<void> => {
  const queryString: string = `
        UPDATE "userCourses" SET "active" = false
        WHERE "userId" = $1 AND "courseId" = $2;
    `;

  await client.query(queryString, [userId, courseId]);
};

export const showCourseService = async () => {
  const query: CourseResult = await client.query('SELECT * FROM "courses";');

  if (!query.rowCount) {
    throw new AppError("No course found", 404);
  }
  return query.rows;
};

export const showUserCoursesService = async (courseId: string) => {
  const queryString: string = `
    SELECT 
        u.id AS "userId",
        u."name" AS "userName",
        c.id AS "courseId",
        c."name" AS "courseName",
        c.description AS "courseDescription",
        uc."active" AS "userActiveInCourse"
    FROM courses c 
    JOIN "userCourses" uc 
        ON c.id = uc."courseId"
    JOIN users u 
        ON u.id = uc."userId"
    WHERE c.id = $1;
`;

  const queryResult = await client.query(queryString, [courseId]);

  return queryResult.rows;
};
