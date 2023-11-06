import format from "pg-format";
import {
  UserRequest,
  UserResult,
  UserReturn,
} from "../interfaces/user.interface";
import { userPassword } from "../schemas/user.schema";
import { AppError } from "../errors";
import { client } from "../database";
import { hash } from "bcryptjs";

export const createUserService = async (
  data: UserRequest
): Promise<UserReturn> => {
  data.password = await hash(data.password, 10);
  const queryFormat: string = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    Object.keys(data),
    Object.values(data)
  );

  const query: UserResult = await client.query(queryFormat);
  return userPassword.parse(query.rows[0]);
};

export const showUserCourseService = async (userId: string) => {
  const queryString: string = `
        SELECT 
            c.id "courseId",
            c."name" "courseName",
            c.description "courseDescription",
            uc.active "userActiveInCourse",
            u.id "userId",
            u."name" "userName"
        FROM users u 
        JOIN "userCourses" uc 
            ON u.id = uc."userId" 
        JOIN courses c 
            ON c.id = uc."courseId" 
        WHERE u.id = $1;
    `;

  const queryResult = await client.query(queryString, [userId]);

  if (!queryResult.rowCount) {
    throw new AppError("No course found", 404);
  }

  return queryResult.rows;
};

export const showUserService = async () => {
  const query = `
        SELECT 
            u.id,
            u.name,
            u.email,
            u.admin
        FROM users u ;
    `;

  const arrayResult: UserResult = await client.query(query);

  return arrayResult.rows;
};
