import FeedPosts from "@/components/post/feed-posts";
import SuggestedUsers from "@/components/user/suggested-users";

export default function HomePage() {
  return (
    <section className="flex items-start gap-20">
      <div className="basis-2/3">
        <FeedPosts />
      </div>
      <div className="basis-1/3 hidden md:block">
        <SuggestedUsers />
      </div>
    </section>
  );
}
