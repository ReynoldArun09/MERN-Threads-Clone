import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePostApi } from "../apis/post.api";

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
