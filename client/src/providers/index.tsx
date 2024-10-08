import AuthStateContextProvider from "@/context/authStateContext";
import { ThemeProvider } from "@/context/themeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

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
        <ThemeProvider>
          <AuthStateContextProvider>
            {children}
            <Toaster closeButton richColors />
          </AuthStateContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
