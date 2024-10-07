import { Router } from "express";
import {
  FollowUnFollowUserApi,
  FreezeAccountApi,
  GetSuggestedUsersApi,
  GetUserProfileApi,
  UpdateUserProfileApi,
} from "../controllers";
import { AuthMiddleware, ValidateParams } from "../middlewares";
import { paramsSchema } from "../schemas";

export const userRoutes = Router();
userRoutes.get("/profile/:query", GetUserProfileApi);
userRoutes.get("/suggested-users", AuthMiddleware, GetSuggestedUsersApi);
userRoutes.get(
  "/follow-unfollow/:id",
  AuthMiddleware,
  ValidateParams(paramsSchema),
  FollowUnFollowUserApi
);
userRoutes.put("/freeze", AuthMiddleware, FreezeAccountApi);
userRoutes.put("/update/:id", AuthMiddleware, UpdateUserProfileApi);
