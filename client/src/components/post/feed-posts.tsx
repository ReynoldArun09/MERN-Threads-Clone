import { GetFeedPostsQuery } from "@/services/queries/post-queries";
import LoadingSpinner from "../common/loading-spinner";
import Post from "./post";

export default function FeedPosts() {
  const { isLoading, data: posts } = GetFeedPostsQuery();
  return (
    <section>
      {!isLoading && posts?.length === 0 && (
        <h1>Follow some users to see the feed</h1>
      )}
      {isLoading && <LoadingSpinner />}
      {posts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </section>
  );
}
