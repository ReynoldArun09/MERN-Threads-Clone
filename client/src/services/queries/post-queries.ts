import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { FeedPostApi, SinglePostApi, UserPostApi } from "../apis/post.api";

export function GetFeedPostsQuery() {
  return useInfiniteQuery({
    queryKey: ["feed-posts"],
    queryFn: FeedPostApi,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.length * 10; // 10 is our limit
      return lastPage.totalPosts && totalFetched < lastPage.totalPosts
        ? allPages.length
        : undefined;
    },
    initialPageParam: 0,
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

export function GetCurrentPost(id: string) {
  return useQuery({
    queryKey: ["single-post", id],
    queryFn: async () => {
      if (!id) {
        return null;
      } else {
        return await SinglePostApi(id);
      }
    },
  });
}
