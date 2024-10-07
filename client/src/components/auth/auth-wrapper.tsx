import useAuthState from "@/hooks/useAuthState";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

interface AuthWrapperProps {
  children: React.ReactNode;
  auth: "sign-in" | "sign-up";
}

export default function AuthWrapper({ children, auth }: AuthWrapperProps) {
  const { ToggleAuthState } = useAuthState();
  return (
    <Card className="w-[400px] m-auto">
      <CardHeader className="text-3xl font-bold text-foreground">
        <div className="text-start">
          <h1 className="text-2xl font-bold text-foreground">
            {auth === "sign-in"
              ? "Welcome back! Ready to continue your journey?"
              : "Join our growing community!"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {auth === "sign-in"
              ? "New to our platform ?"
              : "Already have an account ?"}
            <Button
              variant={"link"}
              className="font-bold underline py-0 px-2"
              onClick={() =>
                ToggleAuthState(auth === "sign-in" ? "sign-up" : "sign-in")
              }
            >
              {auth === "sign-in" ? "Create an account" : "Sign in"}
            </Button>
          </p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
