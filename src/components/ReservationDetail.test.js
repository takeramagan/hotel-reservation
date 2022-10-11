import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReservationDetail from "./ReservationDetail";
import reservations from "../reservations.json";

describe("reservationDetail", () => {
  it("Add new", () => {
    render(<ReservationDetail onClose={() => {}} reservation={{}} />);
    expect(screen.getByText("Add reservation")).toBeInTheDocument();
  });
  it("Edit", async () => {
    const handleClick = jest.fn();
    render(
      <ReservationDetail
        onClose={handleClick}
        reservation={{ ...reservations[0], key: 1 }}
      />
    );
    expect(screen.getByText("Edit reservation")).toBeInTheDocument();
    fireEvent.click(screen.getByText(/close/i));
    await waitFor(() => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
    fireEvent.click(screen.getByText(/save/i));
    await waitFor(() => {
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });

  it("Edit delete", async () => {
    const onClose = jest.fn();
    render(
      <ReservationDetail
        onClose={onClose}
        reservation={{ ...reservations[0], key: 1 }}
      />
    );
    expect(screen.getByText("Edit reservation")).toBeInTheDocument();
    fireEvent.click(screen.getAllByText(/Delete/i)[0]);
    await waitFor(() => {
      expect(screen.getByText("Confirm")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Confirm"));
    await waitFor(() => {
      expect(onClose).toBeCalled();
    });
  });
});
