import { axiosInstance as axios, isAxiosError } from "@/config/axios";
import { PostResponseType, PostSchemaExtendedType } from "../types";

export interface PostResponse {
  success: boolean;
  data: PostResponseType[];
  totalPosts?: number | undefined;
}

export const FeedPostApi = async ({ pageParam = 0 }): Promise<PostResponse> => {
  const limit = 5;
  try {
    const response = await axios.get(
      `post/all/feeds?limit=${limit}&offset=${pageParam}`
    );
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

export const UserPostApi = async (
  username: string
): Promise<PostResponseType[]> => {
  try {
    const response = await axios.get(`post/user/${username}`);
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

export const CreatePostApi = async (
  values: PostSchemaExtendedType
): Promise<PostResponseType> => {
  try {
    const response = await axios.post(`post/create`, values);
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
