import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  FollowAndUnfollowUserApi,
  FreezeAccountApi,
  UpdateUserProfileApi,
} from "../apis/user-api";

export function FollowAndUnFollowMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["follow-unfollow"],
    mutationFn: FollowAndUnfollowUserApi,
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({ queryKey: ["suggested-users"] });
      await queryClient.invalidateQueries({ queryKey: ["feed-posts"] });
    },
  });
}

export function UserAccountFreezeMutation() {
  return useMutation({
    mutationKey: ["freeze-account"],
    mutationFn: FreezeAccountApi,
    onSuccess: async (data) => {
      toast.success(data.message);
    },
  });
}

export function UpdateUserPofileMutation() {
  return useMutation({
    mutationKey: ["update-profile"],
    mutationFn: UpdateUserProfileApi,
  });
}
