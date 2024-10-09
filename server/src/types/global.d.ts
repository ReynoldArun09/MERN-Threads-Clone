import { z } from "zod";

const EnvVariables = z.object({
  PORT: z.string().min(1).max(4),
  CORS_ORIGIN: z.string().min(1),
  DATABASE_URL: z.string().min(1).readonly(),
  JWT_SECRET_KEY: z.string().min(1),
  JWT_EXPIRE_TIME: z.string().min(1),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
});

declare global {
  namespace NodeJS {
    export interface ProcessEnv extends z.infer<typeof EnvVariables> {}
  }
}

declare global {
  namespace Express {
    export interface Request {
      user: JwtPayloadExtendedType;
    }
  }
}

export type JwtPayloadExtendedType = {
  username: string;
  email: string;
  id: string;
  bio: string;
  profilePicture: string;
  name: string;
  website: string;
};
