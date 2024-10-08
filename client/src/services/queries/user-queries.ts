import { useQuery } from "@tanstack/react-query";
import { SuggestedUsersApi, UserProfileApi } from "../apis/user-api";

export function GetSuggestedUsersQuery() {
  return useQuery({
    queryKey: ["suggested-users"],
    queryFn: SuggestedUsersApi,
  });
}

export function GetUserProfileQuery(query: string | number) {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      if (!query) {
        return null;
      } else {
        return await UserProfileApi(query);
      }
    },
  });
}
