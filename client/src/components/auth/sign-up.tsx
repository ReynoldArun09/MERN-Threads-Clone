import SignUpForm from "../forms/sign-up-form";
import AuthWrapper from "./auth-wrapper";

export default function SignUp() {
  return (
    <AuthWrapper auth="sign-up">
      <SignUpForm />
    </AuthWrapper>
  );
}
