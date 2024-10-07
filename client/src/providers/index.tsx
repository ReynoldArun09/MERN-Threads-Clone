import AuthStateContextProvider from "@/context/authStateContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <AuthStateContextProvider>{children}</AuthStateContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
