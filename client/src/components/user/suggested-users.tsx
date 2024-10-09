import { GetSuggestedUsersQuery } from "@/services/queries/user-queries";
import SuggestedUserSkeleton from "../skeletons/suggested-user-skeleton";
import SuggestedUser from "./suggested-user";

export default function SuggestedUsers() {
  const { data: suggestedUsers, isLoading } = GetSuggestedUsersQuery();

  if (!isLoading && suggestedUsers?.length === 0) {
    return null;
  }

  return (
    <section>
      <h1 className="mb-4 font-bold">SuggestedUsers</h1>
      <div className="flex flex-col gap-4">
        {suggestedUsers?.map((user) => (
          <SuggestedUser key={user._id} user={user} />
        ))}
        {isLoading &&
          [0, 1, 2, 3, 4, 5].map((i) => (
            <SuggestedUserSkeleton key={`skel-${i}`} />
          ))}
      </div>
    </section>
  );
}
