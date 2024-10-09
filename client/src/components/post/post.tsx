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
import { AiOutlineEllipsis } from "react-icons/ai";
import { Button } from "../ui/button";

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
    <Card className="grid bg-secondary rounded-none px-6 pb-2 pt-4 border-b-1 border-b-gray-300 dark:border-b-gray-700">
      <div className="col-start-1 row-start-1 col-span-1">
        <Avatar
          className="w-12 h-12"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/${user?.username}`);
          }}
        >
          <AvatarImage
            src={
              user?.profilePicture
                ? user?.profilePicture
                : "https://bit.ly/dan-abramov"
            }
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="col-start-2 row-start-1 col-span-11">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <h1
              className="text-sm font-bold pointer hover:underline "
              onClick={(e) => {
                e.preventDefault();
                navigate(`/${user?.username}`);
              }}
            >
              {user?.username}
            </h1>
            <img src="/verified.png" alt="img" className="w-4 h-4" />
            <h2 className="font-medium w-[200px] text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt))}
            </h2>
          </div>
          <div className="flex gap-2 items-center">
            <div>
              {authUser?.id === user?._id && (
                <AiFillDelete size={20} onClick={handleDeletePost} />
              )}
            </div>
            <Button variant={"secondary"}>
              <AiOutlineEllipsis size={20} />
            </Button>
          </div>
        </div>
      </div>
      <div className="col-start-2 row-start-2 col-span-11">
        <div className="space-y-2">
          <h1
            className="font-medium pointer"
            onClick={() => navigate(`/${user?.username}/post/${post._id}/`)}
          >
            {post.text}
          </h1>
          {post.img && (
            <div
              className="rounded-md overflow-hidden border-[1px] mr-4 border-solid border-gray-300"
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
