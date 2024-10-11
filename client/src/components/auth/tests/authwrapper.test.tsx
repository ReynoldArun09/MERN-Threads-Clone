import AuthWrapper from "@/components/auth/auth-wrapper";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Auth wrapper", () => {
  it("renders sign in component correctly", () => {
    render(
      <AuthWrapper auth="sign-in">
        <div>Sign in form</div>
      </AuthWrapper>
    );
    expect(
      screen.getByText("Welcome back! Ready to continue your journey?")
    ).toBeInTheDocument();
    expect(screen.getByText("New to our platform ?")).toBeInTheDocument();
    expect(screen.getByText("Create an account")).toBeInTheDocument();
  });

  it("renders sign up component correctly", () => {
    render(
      <AuthWrapper auth="sign-up">
        <div>Sign up form</div>
      </AuthWrapper>
    );

    expect(screen.getByText("Join our growing community!")).toBeInTheDocument();
    expect(screen.getByText("Already have an account ?")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  it("toggles from sign-in to sign-up", () => {
    render(
      <AuthWrapper auth="sign-in">
        <div>Sign-In Form</div>
      </AuthWrapper>
    );

    const toggleButton = screen.getByText("Create an account");
    fireEvent.click(toggleButton);

    expect(
      screen.getByText("Welcome back! Ready to continue your journey?")
    ).toBeInTheDocument();
  });

  it("toggles from sign-up to sign-in", () => {
    render(
      <AuthWrapper auth="sign-up">
        <div>Sign-Up Form</div>
      </AuthWrapper>
    );

    const toggleButton = screen.getByText("Sign in");
    fireEvent.click(toggleButton);

    expect(screen.getByText("Join our growing community!")).toBeInTheDocument();
  });
});
