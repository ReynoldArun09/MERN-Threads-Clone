import ActionsButton from "@/components/common/actions-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import Comment from "@/components/post/comment";
import { useQuery } from "@tanstack/react-query";
import { UserDataType } from "@/services/types";
import { DeletePostMutation } from "@/services/mutations/post-mutations";
import { GetUserProfileQuery } from "@/services/queries/user-queries";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "@/components/common/loading-spinner";
import { GetCurrentPost } from "@/services/queries/post-queries";

export default function PostPage() {
  const { username, pid } = useParams<{ username: string; pid: string }>();
  const navigate = useNavigate();
  const { data: authUser } = useQuery<UserDataType>({
    queryKey: ["verify-user"],
  });
  const { data: user, isLoading } = GetUserProfileQuery(username!);
  const { data: currentPost } = GetCurrentPost(pid!);
  const { mutate } = DeletePostMutation();

  const handleDeletePost = () => {
    if (currentPost?._id) {
      mutate(currentPost?._id);
      navigate(-1);
    } else {
      return null;
    }
  };

  if (!user && isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!currentPost) return null;

  return (
    <>
      <div className="flex">
        <div className="flex w-full items-center gap-3">
          <Avatar>
            <AvatarImage src={user?.profilePic} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center">
            <h1 className="font-bold">{user?.username}</h1>
            <img src="/verified.png" alt="verified" className="w-4 h-4 ml-4" />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          {authUser?.id === user?._id && (
            <TrashIcon
              cursor={"pointer"}
              onClick={handleDeletePost}
              className="h-6 w-6"
            />
          )}
        </div>
      </div>
      <p className="my-3">{currentPost?.text}</p>
      {currentPost?.img && (
        <div className="rounded-md overflow-hidden border-2 border-solid border-gray-500">
          <img src={currentPost.img} alt="post" className="w-full" />
        </div>
      )}
      <div className="flex gap-3 my-3">
        <ActionsButton post={currentPost} />
      </div>

      <Separator className="my-2" />
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl">👋</h1>
          <h2 className="text-gray-500">Get the app to like, reply and post</h2>
        </div>
        <Button variant={"ghost"}>Get</Button>
      </div>
      <Separator className="my-2" />
      {currentPost?.replies?.map((reply) => (
        <Comment
          reply={reply}
          key={reply._id}
          lastReply={
            reply._id ===
            currentPost.replies[currentPost.replies.length - 1]._id
          }
        />
      ))}
    </>
  );
}
