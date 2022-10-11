import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReservationDetail from "./ReservationDetail";
import reservations from "../reservations.json";

describe("reservationDetail", () => {
  it("Add new", () => {
    render(<ReservationDetail onClose={() => {}} reservation={{}} />);
    expect(screen.getByText("Add reservation")).toBeInTheDocument();
  });
  it("Edit", () => {
    const handleClick = jest.fn();
    render(
      <ReservationDetail
        onClose={handleClick}
        reservation={{ ...reservations[0], key: 1 }}
      />
    );
    expect(screen.getByText("Edit reservation")).toBeInTheDocument();
    fireEvent.click(screen.getByText(/close/i));
    fireEvent.click(screen.getByText(/save/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("Edit delete", async () => {
    render(
      <ReservationDetail
        onClose={() => {}}
        reservation={{ ...reservations[0], key: 1 }}
      />
    );
    expect(screen.getByText("Edit reservation")).toBeInTheDocument();
    fireEvent.click(screen.getAllByText(/Delete/i)[0]);
    await waitFor(() => screen.findByText(/confirm delete/i));
    expect(screen.getByText(/confirm delete/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/confirm delete/i));
    // expect()
  });
});
