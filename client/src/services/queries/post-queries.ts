import { useQuery } from "@tanstack/react-query";
import { FeedPostApi } from "../apis/post.api";

export function GetFeedPostsQuery() {
  return useQuery({
    queryKey: ["feed-posts"],
    queryFn: FeedPostApi,
  });
}
