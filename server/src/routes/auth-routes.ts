import { Router } from "express";
import {
  SignInUserApi,
  SignOutUserApi,
  SignUpUserApi,
  VerifyUserApi,
} from "../controllers";

import { signinSchema, signupSchema } from "../schemas";
import { AuthMiddleware, ValidateBody } from "../middlewares";

export const authRoutes = Router();
authRoutes.get("/signout", SignOutUserApi);
authRoutes.post("/signin", ValidateBody(signinSchema), SignInUserApi);
authRoutes.post("/signup", ValidateBody(signupSchema), SignUpUserApi);
authRoutes.get("/verify", AuthMiddleware, VerifyUserApi);
