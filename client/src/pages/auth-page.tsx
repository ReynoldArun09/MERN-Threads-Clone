import SignIn from "@/components/auth/sign-in";
import SignUp from "@/components/auth/sign-up";
import useAuthState from "@/hooks/useAuthState";

export default function AuthPage() {
  const { authState } = useAuthState();
  return (
    <section className="h-screen m-auto flex items-center justify-center border-2 w-screen relative">
      <img src="/threads.png" alt="" className="absolute top-0" />
      <div className="z-10">
        {authState === "sign-in" ? <SignIn /> : <SignUp />}
      </div>
    </section>
  );
}
