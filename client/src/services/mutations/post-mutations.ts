import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreatePostApi,
  DeletePostApi,
  LikeAndUnlikePostApi,
  ReplyPostApi,
} from "../apis/post.api";

export function CreatePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-post"],
    mutationFn: CreatePostApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-posts"] });
    },
  });
}

export function DeletePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-post"],
    mutationFn: DeletePostApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-posts"] });
    },
  });
}

export function ReplyToPostMutation(postId: string) {
  return useMutation({
    mutationKey: ["reply-post"],
    mutationFn: (replyText: string) => ReplyPostApi(postId, replyText),
  });
}

export function LikeAndUnLikePostMutation() {
  return useMutation({
    mutationKey: ["like-n-unlike"],
    mutationFn: LikeAndUnlikePostApi,
  });
}
