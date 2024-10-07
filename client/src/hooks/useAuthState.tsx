import { AuthStateContext } from "@/context/authStateContext";
import { useContext } from "react";

export default function useAuthState() {
  const { authState, ToggleAuthState } = useContext(AuthStateContext);
  return {
    authState,
    ToggleAuthState,
  };
}
