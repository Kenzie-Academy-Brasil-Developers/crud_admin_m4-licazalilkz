import { AppError } from "../errors";
import { LoginRequest } from "../interfaces/login.interface";
import { UserResult } from "../interfaces/user.interface";
import { client } from "../database";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export const loginService = async (data: LoginRequest): 
Promise<string> => {
  const queryString: string = 'SELECT * FROM "users" WHERE email = $1;';
  const queryResult: UserResult = await client.query(queryString, [data.email]);

  if (!queryResult.rowCount) {
    throw new AppError(
      "Wrong email/password",
      401
    );
  }

  const password: boolean = await compare(
    data.password,
    queryResult.rows[0].password
  );

  if (!password) {
    throw new AppError(
      "Someting goings wrong, check email or password and try again !",
      401
    );
  }

  const token: string = sign(
    { email: queryResult.rows[0].email, admin: queryResult.rows[0].admin },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: queryResult.rows[0].id.toString(),
    }
  );

  return token;
};
