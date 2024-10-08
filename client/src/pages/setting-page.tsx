import { Button } from "@/components/ui/button";
import { SignOutMutation } from "@/services/mutations/auth-mutations";
import { UserAccountFreezeMutation } from "@/services/mutations/user-mutations";

export default function SettingPage() {
  const { mutate: userAccountFreeze, isPending } = UserAccountFreezeMutation();
  const { mutate: signout } = SignOutMutation();

  const handleFreezeAccount = () => {
    userAccountFreeze();
    signout();
  };

  return (
    <section className="space-y-5">
      <h1 className="text-3xl font-bold">Freeze Your Account</h1>
      <h2 className="text-lg text-gray-500">
        You can unfreeze your account anytime by logging in.
      </h2>
      <Button size={"lg"} onClick={handleFreezeAccount} disabled={isPending}>
        Freeze
      </Button>
    </section>
  );
}
