import { axiosInstance as axios, isAxiosError } from "@/config/axios";
import {
  ApiResponseType,
  SuggestedUserResponseType,
  UserResponseType,
} from "../types";
import { ProfileSchemaType } from "@/schemas/update-user-Schemas";

export const SuggestedUsersApi =
  async (): Promise<SuggestedUserResponseType> => {
    try {
      const response = await axios.get(`user/suggested-users`);
      return response.data.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data.message || "An error occured";
        throw new Error(message);
      } else {
        throw new Error("An unexpected error occured");
      }
    }
  };

export const FollowAndUnfollowUserApi = async (
  id: string
): Promise<ApiResponseType> => {
  try {
    const response = await axios.get(`user/follow-unfollow/${id}`);
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

export const UserProfileApi = async (
  query: string | number
): Promise<UserResponseType> => {
  try {
    const response = await axios.get(`user/profile/${query}`);
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data.message || "An error occured";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occured");
    }
  }
};

export const FreezeAccountApi = async (): Promise<ApiResponseType> => {
  try {
    const response = await axios.put("user/freeze", {});
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

export const UpdateUserProfileApi = async ({
  id,
  values,
}: {
  id: string;
  values: ProfileSchemaType;
}) => {
  try {
    const response = await axios.put(`user/update/${id}`, values);
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data.message || "An error occured";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occured");
    }
  }
};
