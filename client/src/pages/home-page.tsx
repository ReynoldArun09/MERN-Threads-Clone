import FeedPosts from "@/components/post/feed-posts";
import SuggestedUsers from "@/components/user/suggested-users";

export default function HomePage() {
  return (
    <section className="flex items-start gap-20">
      <div className="basis-[75%]">
        <FeedPosts />
      </div>
      <div className="basis-1/4 hidden md:block">
        <SuggestedUsers />
      </div>
    </section>
  );
}
