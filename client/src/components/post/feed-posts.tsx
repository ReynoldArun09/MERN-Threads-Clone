import { GetFeedPostsQuery } from "@/services/queries/post-queries";
import LoadingSpinner from "../common/loading-spinner";
import Post from "./post";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function FeedPosts() {
  const { ref, inView } = useInView();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = GetFeedPostsQuery();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <LoadingSpinner />;

  if (!isLoading && data?.pages.length === 0) {
    return <h1>Follow some users to see the feed</h1>;
  }

  if (status === "error") {
    return <h1>Error: {error?.message}</h1>;
  }

  return (
    <section>
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.data.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      ))}
      <div ref={ref}>{isFetchingNextPage ? <LoadingSpinner /> : ""}</div>
    </section>
  );
}
