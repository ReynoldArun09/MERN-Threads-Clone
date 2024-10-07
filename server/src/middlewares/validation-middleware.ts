import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const ValidateBody =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body });
      next();
    } catch (error) {
      next(error);
    }
  };

export const ValidateParams =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ params: req.params });
      next();
    } catch (error) {
      next(error);
    }
  };
