import React, { useState } from "react";
import "./App.css";
import Home from "./Home";
import data from "./reservations.json";
import { ReservationContext, FilterContext } from "./context/Context";
import { filterInitData } from "./constants/constants";

function App() {
  const [reservations, setReservations] = useState(data);
  const [filters, setFilters] = useState(filterInitData);
  return (
    <ReservationContext.Provider value={[reservations, setReservations]}>
      <FilterContext.Provider value={[filters, setFilters]}>
        <Home />
      </FilterContext.Provider>
    </ReservationContext.Provider>
  );
}

export default App;
