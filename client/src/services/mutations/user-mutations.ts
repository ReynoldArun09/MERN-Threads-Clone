import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FollowAndUnfollowUserApi } from "../apis/user-api";

export function FollowAndUnFollowMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["follow-unfollow"],
    mutationFn: FollowAndUnfollowUserApi,
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({ queryKey: ["suggested-users"] });
    },
  });
}
