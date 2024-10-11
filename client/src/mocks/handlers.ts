import { http, HttpResponse } from "msw";
import { mockUser } from "./mockData";

interface SignupRequestBody {
  email: string;
  password: string;
  username: string;
}

interface SigninRequestBody {
  username: string;
  password: string;
}

async function parseJSONBody<T>(request: Request): Promise<T> {
  const body = (await request.json()) as T;
  return body;
}

export const handlers = [
  http.post("/api/v1/auth/signup", async ({ request }) => {
    try {
      const data = await parseJSONBody<SignupRequestBody>(request);
      if (!data.email || !data.password || !data.username) {
        return HttpResponse.json({
          status: 400,
          message: "All fields are required",
        });
      }
      if (data?.email === "existing@example.com") {
        return HttpResponse.json({
          status: 400,
          message: "Email already exists",
        });
      }
      return HttpResponse.json({
        status: 201,
        message: "User created successfully",
      });
    } catch {
      return HttpResponse.json({
        status: 500,
        message: "Internal server error",
      });
    }
  }),

  http.post("/api/v1/auth/signin", async ({ request }) => {
    try {
      const data = await parseJSONBody<SigninRequestBody>(request);
      if (!data.username || !data.password) {
        return HttpResponse.json({
          status: 400,
          message: "All fields are required",
        });
      }
      if (data.username !== "test") {
        return HttpResponse.json({
          status: 400,
          message: "User does not exist",
        });
      }

      if (data.password !== "test123456789A$") {
        return HttpResponse.json({
          status: 400,
          message: "Invalid password",
        });
      }
      return HttpResponse.json({
        status: 200,
        message: "User logged in successfully",
      });
    } catch {
      return HttpResponse.json({
        status: 500,
        message: "Internal server error",
      });
    }
  }),

  http.get("/api/v1/auth/verify", async ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return HttpResponse.json({
      status: 200,
      message: "User verified",
      data: mockUser,
    });
  }),

  http.get("/api/v1/auth/signout", async () => {
    return HttpResponse.json({
      status: 200,
      message: "User signed out successfully",
    });
  }),
];
