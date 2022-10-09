import React, { useState } from "react";
import "./App.css";
import Home from "./Home";
import data from "./reservations.json";
import ReservationContext from "./ReservationContext";

function App() {
  const [reservations, setReservations] = useState(data);
  return (
    <ReservationContext.Provider value={[reservations, setReservations]}>
      <Home />
    </ReservationContext.Provider>
  );
}

export default App;
