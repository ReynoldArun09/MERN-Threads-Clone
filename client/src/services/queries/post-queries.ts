import { useQuery } from "@tanstack/react-query";
import { FeedPostApi, UserPostApi } from "../apis/post.api";

export function GetFeedPostsQuery() {
  return useQuery({
    queryKey: ["feed-posts"],
    queryFn: FeedPostApi,
  });
}

export function GetUserPostsQuery(username: string) {
  return useQuery({
    queryKey: ["user-posts"],
    queryFn: async () => {
      if (!username) {
        return null;
      } else {
        return await UserPostApi(username);
      }
    },
  });
}
