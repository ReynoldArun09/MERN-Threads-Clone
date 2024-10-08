import { RepliesType } from "@/services/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { formatDistanceToNow } from "date-fns";

interface CommentProps {
  reply: RepliesType;
  lastReply: boolean;
}

export default function Comment({ reply, lastReply }: CommentProps) {
  return (
    <>
      <section className="flex gap-4 py-2 my-2 w-full">
        <Avatar>
          <AvatarImage />
          <AvatarFallback>
            {reply?.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex gap-1 w-full flex-col">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-sm font-bold underline cursor-pointer">
              {reply?.username}
            </h1>
            <p className="text-md text-gray-600">
              {formatDistanceToNow(new Date(reply?.createdAt))}
            </p>
          </div>
          <p className="text-sm">{reply?.text}</p>
        </div>
      </section>
      {!lastReply ? <Separator /> : null}
    </>
  );
}
