import FeedPosts from "@/components/post/feed-posts";
import SiteHeader from "@/components/site/site-header";
import SuggestedUsers from "@/components/user/suggested-users";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <section className="flex">
        <div className="flex flex-1 justify-center items-center">
          <FeedPosts />
        </div>
        <div>
          <SuggestedUsers />
        </div>
      </section>
    </>
  );
}
