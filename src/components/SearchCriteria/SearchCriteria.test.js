import React from "react";
import { SearchCriteria } from "./SearchCriteria";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("search bar rendered", () => {
  it("input exist", () => {
    render(<SearchCriteria setFilter={() => {}} />);
    expect(screen.getByText("First name")).toBeInTheDocument();
    expect(screen.getByText("Last name")).toBeInTheDocument();
  });
  it("submit", async () => {
    const handleClick = jest.fn();
    render(<SearchCriteria setFilter={handleClick} />);
    expect(screen.getByText("Submit")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(handleClick).toBeCalled();
    });
  });
});
