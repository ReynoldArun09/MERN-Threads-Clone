import request from "supertest";
import app from "../app";
import { ErrorMessages, SuccessMessages } from "../constants";
import {
  findUserByEmail,
  findUserByUsername,
  generateJwtToken,
} from "../helpers";
import bcrypt from "bcryptjs";
import { User } from "../models";

jest.mock("../helpers");
jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));
jest.mock("../models");

describe("Sign In", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should return 400 status if user doesnt exist", async () => {
    (findUserByUsername as jest.Mock).mockResolvedValueOnce(null);
    const response = await request(app)
      .post("/api/v1/auth/signin")
      .send({ username: "nonExistingUser", password: "password12345A$" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(ErrorMessages.USER_NOT_FOUND);
  });

  it("should return 400 status code if password is incorrect", async () => {
    (findUserByUsername as jest.Mock).mockResolvedValueOnce({
      username: "existingUser",
      password: "wrongPassword",
    });
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);
    const response = await request(app)
      .post("/api/v1/auth/signin")
      .send({ username: "existingUser", password: "password12345A$" });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(ErrorMessages.INVALID_PASSWORD);
  });

  it("should sign in user and return status code 200", async () => {
    const mockUser = { username: "testuser", password: "hashedpassword" };
    (findUserByUsername as jest.Mock).mockResolvedValueOnce({
      username: mockUser.username,
      password: mockUser.password,
    });

    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

    (generateJwtToken as jest.Mock).mockResolvedValueOnce("testToken");
    const response = await request(app)
      .post("/api/v1/auth/signin")
      .send({ username: mockUser.username, password: mockUser.password });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(SuccessMessages.SIGNIN_SUCCESS);
  });
});

describe("Sign Up", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should return 500 status code if password validation failed", async () => {
    const response = await request(app).post("/api/v1/auth/signup").send({
      username: "testuser",
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(response.status).toBe(500);
    expect(response.body.errors.body).not.toHaveLength(0);
  });

  it("should return 201 status code if user is created", async () => {
    (findUserByEmail as jest.Mock).mockResolvedValueOnce(null);
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce("password12345A$");
    (User.create as jest.Mock).mockResolvedValueOnce({});
    const response = await request(app).post("/api/v1/auth/signup").send({
      username: "newuser",
      name: "New User",
      email: "new@example.com",
      password: "password123A$",
    });
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(SuccessMessages.SIGNUP_SUCCESS);
  });
});

describe("sign out API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 if user is signed out successfully", async () => {
    const response = await request(app).get("/api/v1/auth/signout");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(SuccessMessages.SIGNOUT_SUCCESS);
  });
});
