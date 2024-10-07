import SignIn from "@/components/auth/sign-in";
import SignUp from "@/components/auth/sign-up";
import useAuthState from "@/hooks/useAuthState";

export default function AuthPage() {
  const { authState } = useAuthState();
  return <section>{authState === "sign-in" ? <SignIn /> : <SignUp />}</section>;
}
