import React from "react";
import SearchCriteria from "./SearchCriteria";
import { render, screen, fireEvent } from "@testing-library/react";

describe("search bar renderd", () => {
  it("input exist", () => {
    render(<SearchCriteria setFilter={() => {}} />);
    fireEvent.click(screen.getByText(/submit/i));
    expect(screen.getByText("First name")).toBeInTheDocument();
    expect(screen.getByText("Last name")).toBeInTheDocument();
  });
});
