import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { FollowAndUnFollowMutation } from "@/services/mutations/user-mutations";
import { UserResponseType } from "@/services/types";

interface SuggestedUserProps {
  user: UserResponseType;
}

export default function SuggestedUser({ user }: SuggestedUserProps) {
  const { isPending, mutate: handleFollow } = FollowAndUnFollowMutation();

  return (
    <section className="flex gap-2 justify-between items-center">
      <Link to={`${user.username}`} className="flex gap-2">
        <Avatar>
          <AvatarImage src={user.profilePic} alt={user.username} />
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-sm font-bold">{user.username}</h1>
          <h2 className="text-sm">{user.name}</h2>
        </div>
      </Link>
      <Button
        size={"sm"}
        onClick={() => handleFollow(user._id)}
        disabled={isPending}
      >
        Follow
      </Button>
    </section>
  );
}
