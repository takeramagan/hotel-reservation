import React from "react";
import ReservationTable from "./ReservationTable";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const dataToDisplay = [
  {
    key: 1,
    firstName: "IDM",
    lastName: "QQWWEE",
    room: { roomSize: "big", roomQuantity: 1 },
    stay: {
      arrivalDate: "2021-11-18T05:00:00.000Z",
      departureDate: "2021-11-18T05:00:00.000Z",
    },
  },
  {
    key: 2,
    firstName: "IDM",
    lastName: "abc",
    room: { roomSize: "big", roomQuantity: 2 },
    stay: {
      arrivalDate: "2021-11-18T05:00:00.000Z",
      departureDate: "2021-11-18T05:00:00.000Z",
    },
  },
];

describe("teble renderd", () => {
  it("emptytable", () => {
    render(<ReservationTable filteredData={[]} />);
    expect(screen.getByText("No data found")).toBeInTheDocument();
  });
  it("not empty table", async () => {
    const onEdit = jest.fn();
    render(<ReservationTable filteredData={dataToDisplay} onEdit={onEdit} />);
    expect(screen.getAllByText("IDM")).toHaveLength(2);
    fireEvent.dblClick(screen.getByText("QQWWEE"));
    await waitFor(() => {
      expect(onEdit).toBeCalled();
    });
  });
});
