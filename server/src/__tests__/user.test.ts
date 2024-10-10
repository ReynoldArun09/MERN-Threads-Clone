import request from "supertest";
import app from "../app";
import { User } from "../models";
import { ErrorMessages, SuccessMessages } from "../constants";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

jest.mock("../models");

describe("get user profile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockUser = {
    _id: "12345678911",
    username: "testname",
    email: "test@gmail.com",
    password: "test123456789A$",
  };

  it("should return user profile when params is id", async () => {
    (User.findOne as jest.Mock).mockReturnValueOnce({
      select: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce(mockUser),
    });
    const response = await request(app).get(
      `/api/v1/user/profile/${mockUser._id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should return user profile when params is username", async () => {
    (User.findOne as jest.Mock).mockReturnValueOnce({
      select: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce(mockUser),
    });
    const response = await request(app).get(
      `/api/v1/user/profile/${mockUser.username}`
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should return 400 if user not found", async () => {
    (User.findOne as jest.Mock).mockReturnValueOnce({
      select: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce(null),
    });

    const response = await request(app).get(
      `/api/v1/user/profile/nonexistentid`
    );

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(ErrorMessages.USER_NOT_FOUND);
  });
});

describe("freeze account", () => {
  it("should return 400 if user is not found", async () => {
    (User.findById as jest.Mock).mockResolvedValueOnce(null);

    const mockToken = jwt.sign(
      { id: new mongoose.Types.ObjectId() },
      "randomsecretkey",
      { expiresIn: "1h" }
    );

    const response = await request(app)
      .put("/api/v1/user/freeze")
      .set("Cookie", `treads=${mockToken}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(ErrorMessages.USER_NOT_FOUND);
  });

  it("should return 200 status if user account is freezed", async () => {
    const mockUser = { id: "testUserId", username: "testname", frozen: false };
    (User.findById as jest.Mock).mockResolvedValueOnce(mockUser);
    (User.updateOne as jest.Mock).mockResolvedValueOnce({ modifiedCount: 1 });
    const mockToken = jwt.sign(
      { id: new mongoose.Types.ObjectId() },
      "randomsecretkey",
      { expiresIn: "1h" }
    );

    const response = await request(app)
      .put("/api/v1/user/freeze")
      .set("Cookie", `treads=${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(SuccessMessages.ACCOUNT_FROZEN);
  });
});
