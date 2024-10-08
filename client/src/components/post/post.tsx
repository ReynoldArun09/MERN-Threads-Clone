import { PostResponseType, UserDataType } from "@/services/types";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ActionsButton from "../common/actions-button";
import { AiFillDelete } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { GetUserProfileQuery } from "@/services/queries/user-queries";
import { DeletePostMutation } from "@/services/mutations/post-mutations";
import { Card } from "../ui/card";

interface PostProps {
  post: PostResponseType;
}

export default function Post({ post }: PostProps) {
  const navigate = useNavigate();
  const { data: authUser } = useQuery<UserDataType>({
    queryKey: ["verify-user"],
  });
  const { mutate: deletePost } = DeletePostMutation();

  const { data: user } = GetUserProfileQuery(post.postedById);

  const handleDeletePost = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    deletePost(post._id);
  };

  return (
    <Card className="px-4 rounded-sm">
      <div className="flex gap-3 mb-4 py-5">
        <div className="flex flex-col items-center">
          <Avatar
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${user?.username}`);
            }}
          >
            <AvatarImage src={user?.profilePic} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="w-[1px] h-full bg-gray-300 my-2"></div>
          <div className="relative w-full">
            {post?.replies?.length === 0 && <h1 className="text-center">🥱</h1>}
            {post?.replies[0] && (
              <Avatar>
                <AvatarImage src={post?.replies[0]?.profilePic} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
            {post?.replies[1] && (
              <Avatar>
                <AvatarImage src={post?.replies[0]?.profilePic} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
            {post?.replies[2] && (
              <Avatar>
                <AvatarImage src={post?.replies[0]?.profilePic} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex justify-between w-full">
            <div className="w-full items-center flex">
              <h1
                className="text-sm font-bold pointer hover:underline "
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user?.username}`);
                }}
              >
                {user?.username}
              </h1>
              <img src="/verified.png" alt="img" className="w-4 h-4 ml-1" />
            </div>
            <div className="flex gap-4 items-center">
              <h1 className="font-medium w-[200px] text-right text-gray-500">
                {formatDistanceToNow(new Date(post.createdAt))}
              </h1>
              {authUser?.id === user?._id && (
                <AiFillDelete size={20} onClick={handleDeletePost} />
              )}
            </div>
          </div>
          <h1
            className="font-medium pointer py-4"
            onClick={() => navigate(`/${user?.username}/post/${post._id}/`)}
          >
            {post.text}
          </h1>
          {post.img && (
            <div
              className="rounded-md overflow-hidden border-[1px] border-solid border-gray-300"
              onClick={() => navigate(`/${user?.username}/post/${post._id}/`)}
            >
              <img src={post.img} alt={"image-missing"} />
            </div>
          )}
          <div className="flex gap-3 my-1">
            <ActionsButton post={post} />
          </div>
        </div>
      </div>
    </Card>
  );
}
