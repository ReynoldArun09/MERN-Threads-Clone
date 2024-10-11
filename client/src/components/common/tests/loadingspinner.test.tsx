import LoadingSpinner from "@/components/common/loading-spinner";
import { render, screen } from "@testing-library/react";

describe("loadin spinner", () => {
  it("should render loading spinner", () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toBeInTheDocument();
  });
});
