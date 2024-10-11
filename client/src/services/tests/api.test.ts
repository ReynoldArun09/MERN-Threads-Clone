import { server } from "@/mocks/server";
import {
  SigninApi,
  SignoutUserApi,
  SignupApi,
  VerifyUserApi,
} from "../apis/auth-api";
import { http, HttpResponse } from "msw";

const signupData = {
  email: "1VUjz@example.com",
  password: "test123456789A$",
  username: "testname",
  name: "testname",
};

describe("Signup Api testing", () => {
  it("should return 400 status if fields are missing", async () => {
    const response = await SignupApi({
      email: "",
      password: "",
      username: "",
      name: "",
    });

    expect(response.status).toBe(400);
    expect(response.message).toBe("All fields are required");
  });

  it("should return 400 status if email already exists", async () => {
    const response = await SignupApi({
      ...signupData,
      email: "existing@example.com",
    });
    expect(response.status).toBe(400);
    expect(response.message).toBe("Email already exists");
  });

  it("should return 201 status if user is created", async () => {
    const response = await SignupApi(signupData);
    expect(response.status).toBe(201);
    expect(response.message).toBe("User created successfully");
  });
});

describe("Signin Api testing", () => {
  it("should return 400 status if fields are missing", async () => {
    const response = await SigninApi({
      username: "",
      password: "",
    });
    expect(response.status).toBe(400);
    expect(response.message).toBe("All fields are required");
  });

  it("should return 400 status if user account doesnt exist", async () => {
    const response = await SigninApi({
      username: "nottest",
      password: "test123456789A$",
    });

    expect(response.status).toBe(400);
    expect(response.message).toBe("User does not exist");
  });

  it("should return 400 status if password is incorrect", async () => {
    const response = await SigninApi({
      username: "test",
      password: "incorrectPassword",
    });

    expect(response.status).toBe(400);
    expect(response.message).toBe("Invalid password");
  });
});

describe("Verify user api", () => {
  it("should return 401 status if unauthorized", async () => {
    const response = await VerifyUserApi();
    expect(response).toBe(null);
  });
});

describe("Signout Api testing", () => {
  it("should return 200 status if user is signed out successfully", async () => {
    server.use(
      http.get("/api/v1/auth/signout", async () => {
        return HttpResponse.json({
          status: 200,
          message: "User signed out successfully",
        });
      })
    );
    const response = await SignoutUserApi();
    expect(response.message).toBe("User signed out successfully");
    expect(response.status).toBe(200);
  });
});
