import { axiosInstance as axios, isAxiosError } from "@/config/axios";
import { SigninSchemaType, SignupSchemaType } from "@/schemas/auth-schemas";
import { UserDataType } from "../types";

export const SignupApi = async (values: SignupSchemaType) => {
  try {
    const response = await axios.post("/auth/signup", values);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data.message || "An error occured";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occured");
    }
  }
};

export const SigninApi = async (values: SigninSchemaType) => {
  try {
    const response = await axios.post(`auth/signin`, values);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data.message || "An error occured";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occured");
    }
  }
};

export const VerifyUserApi = async (): Promise<UserDataType | null> => {
  try {
    const response = await axios.get(`auth/verify`);
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return null;
    } else {
      return null;
    }
  }
};

export const SignoutUserApi = async () => {
  try {
    const response = await axios.get(`auth/signout`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data.message || "An error occured";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occured");
    }
  }
};
