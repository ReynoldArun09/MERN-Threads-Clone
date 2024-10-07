import { createContext, PropsWithChildren, useState } from "react";

type AuthStateProps = "sign-in" | "sign-up";

interface initialStateProps {
  authState: AuthStateProps;
  ToggleAuthState: (authState: AuthStateProps) => void;
}

const initialState: initialStateProps = {
  authState: "sign-in",
  ToggleAuthState: () => {},
};

export const AuthStateContext = createContext<initialStateProps>(initialState);

export default function AuthStateContextProvider({
  children,
}: PropsWithChildren) {
  const [authState, setAuthState] = useState<AuthStateProps>(
    initialState.authState
  );

  const ToggleAuthState = (authState: AuthStateProps) => {
    setAuthState(authState);
  };

  return (
    <AuthStateContext.Provider value={{ authState, ToggleAuthState }}>
      {children}
    </AuthStateContext.Provider>
  );
}
