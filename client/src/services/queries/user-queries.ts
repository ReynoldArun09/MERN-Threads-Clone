import { useQuery } from "@tanstack/react-query";
import { SuggestedUsersApi } from "../apis/user-api";

export function GetSuggestedUsersQuery() {
  return useQuery({
    queryKey: ["suggested-users"],
    queryFn: SuggestedUsersApi,
  });
}
