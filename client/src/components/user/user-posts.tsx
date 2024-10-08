import { GetUserPostsQuery } from "@/services/queries/post-queries";
import { useParams } from "react-router-dom";
import Post from "../post/post";
import LoadingSpinner from "../common/loading-spinner";

export default function UserPosts() {
  const { username } = useParams<{ username: string }>();
  const { isLoading, data: posts } = GetUserPostsQuery(username!);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isLoading && posts?.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-lg py-5">User has no post</h1>
      </div>
    );
  }

  return (
    <section>
      {posts && posts?.map((post) => <Post post={post} key={post._id} />)}
    </section>
  );
}
