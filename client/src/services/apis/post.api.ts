import { axiosInstance as axios, isAxiosError } from "@/config/axios";
import { PostResponseType } from "../types";

export const FeedPostApi = async (): Promise<PostResponseType[] | []> => {
  try {
    const response = await axios.get(`post/all/feeds`);
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
