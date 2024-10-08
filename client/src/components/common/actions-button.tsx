import { PostResponseType } from "@/services/types";
import ReplyForm from "../forms/reply-form";
import CommentSVG from "../Svg/comment-svg";
import LikeSVG from "../Svg/like-svg";
import RepostSVG from "../Svg/repost-svg";
import ShareSVG from "../Svg/share-svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useState } from "react";
import { LikeAndUnLikePostMutation } from "@/services/mutations/post-mutations";

interface ActionsButtonProps {
  post: PostResponseType;
}

export default function ActionsButton({ post }: ActionsButtonProps) {
  const [open, setOpen] = useState(false);

  const { mutate: LikeAndUnlikePost } = LikeAndUnLikePostMutation();

  const handleLikAndUnlike = () => {
    LikeAndUnlikePost(post?._id);
  };
  return (
    <section className="flex flex-col space-y-3">
      <div className="flex gap-5 my-2 cursor-pointer">
        <LikeSVG handleLikAndUnlike={handleLikAndUnlike} />
        <RepostSVG />
        <CommentSVG open={open} setOpen={setOpen} />
        <ShareSVG />
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-500">{post?.likes?.length} Likes</p>
        <div className="w-[1px] h-[1px] rounded bg-gray-500"></div>
        <p className="text-xs font-bold">{post?.replies?.length} Comments</p>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="py-10">
          <DialogHeader>
            <DialogTitle>Your Reply?</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <ReplyForm setOpen={setOpen} postId={post?._id} />
        </DialogContent>
      </Dialog>
    </section>
  );
}
