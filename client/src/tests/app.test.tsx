/* eslint-disable @typescript-eslint/no-explicit-any */
import { MemoryRouter } from "react-router-dom";
import App from "@/App";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as authQueries from "@/services/queries/auth-queries";

describe("App Testing", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    vi.clearAllMocks();
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = (initialRoute: string, isAuth: boolean = false) => {
    vi.spyOn(authQueries, "VerifyUserQuery").mockReturnValue({
      isLoading: false,
      data: isAuth,
      error: null,
      isError: false,
    } as any);

    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  it("should redirect to auth page if user is not authenticated", async () => {
    renderWithRouter("/", false);
    await waitFor(() => {
      const spinner = screen.queryByTestId("loading-spinner");
      expect(spinner).not.toBeInTheDocument();
    });
    expect(
      screen.getByText(/Welcome back! Ready to continue your journey?/i)
    ).toBeInTheDocument();
  });

  it("should redirect to home page if user is authenticated", async () => {
    renderWithRouter("/", true);
    await waitFor(() => {
      const spinner = screen.queryByTestId("loading-spinner");
      expect(spinner).not.toBeInTheDocument();
    });
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  it("should allow user to access settings page when authenticated", async () => {
    renderWithRouter("/settings", true);
    await waitFor(() => {
      const spinner = screen.queryByTestId("loading-spinner");
      expect(spinner).not.toBeInTheDocument();
    });
    const heading = screen.getByRole("heading", {
      name: /You can unfreeze your account anytime by logging in./i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("should not allow user to access settings page when not authenticated", async () => {
    renderWithRouter("/settings", false);
    await waitFor(() => {
      const spinner = screen.queryByTestId("loading-spinner");
      expect(spinner).not.toBeInTheDocument();
    });
    const heading = screen.getByRole("heading", {
      name: /Welcome back! Ready to continue your journey?/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("should allow user to access update profile page if user is authenticated", async () => {
    renderWithRouter("/update", true);
    await waitFor(() => {
      const spinner = screen.queryByTestId("loading-spinner");
      expect(spinner).not.toBeInTheDocument();
    });

    const button = screen.getByRole("button", {
      name: /Edit Profile Pic/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("should allow user to access user page and page must contain create button", async () => {
    renderWithRouter("/user", true);
    await waitFor(() => {
      const spinner = screen.queryByTestId("loading-spinner");
      expect(spinner).not.toBeInTheDocument();
    });
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
  it("should allow user to access chat page if user is authenticated", async () => {
    renderWithRouter("/chat", true);
    await waitFor(() => {
      const spinner = screen.queryByTestId("loading-spinner");
      expect(spinner).not.toBeInTheDocument();
    });
    expect(screen.getByText(/ChatPage/i)).toBeInTheDocument();
  });
});
