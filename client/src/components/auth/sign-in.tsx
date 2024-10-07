import SignInForm from "../forms/sign-in-form";
import AuthWrapper from "./auth-wrapper";

export default function SignIn() {
  return (
    <AuthWrapper auth="sign-in">
      <SignInForm />
    </AuthWrapper>
  );
}
