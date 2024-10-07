import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SigninApi, SignoutUserApi, SignupApi } from "../apis/auth-api";

export function SignUpMutation() {
  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: SignupApi,
  });
}

export function SignInMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: SigninApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["verify-user"] });
    },
  });
}

export function SignOutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: SignoutUserApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["verify-user"] });
    },
  });
}
