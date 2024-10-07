import { Router } from "express";
import { AuthMiddleware, ValidateBody, ValidateParams } from "../middlewares";
import {
  CreatePostApi,
  DeletePostApi,
  GetFeedPostsApi,
  GetSinglePostApi,
  GetUserPostsApi,
  LinkAndUnlikePostApi,
  ReplyPostApi,
} from "../controllers";
import { paramsSchema, postSchema, replySchema } from "../schemas";

export const postRoutes = Router();
postRoutes.post(
  "/create",
  AuthMiddleware,
  ValidateBody(postSchema),
  CreatePostApi
);
postRoutes.get("/:id", ValidateParams(paramsSchema), GetSinglePostApi);
postRoutes.get("/user/:username", GetUserPostsApi);
postRoutes.delete(
  "/delete/:id",
  AuthMiddleware,
  ValidateParams(paramsSchema),
  DeletePostApi
);
postRoutes.put(
  "/like-unlike/:id",
  AuthMiddleware,
  ValidateParams(paramsSchema),
  LinkAndUnlikePostApi
);
postRoutes.get("/all/feeds", AuthMiddleware, GetFeedPostsApi);
postRoutes.put(
  "/reply/:id",
  ValidateBody(replySchema),
  AuthMiddleware,
  ValidateParams(paramsSchema),
  ReplyPostApi
);
