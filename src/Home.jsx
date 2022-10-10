import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { FilterContext, ReservationContext } from "./context/Context";
import ReservationDetail from "./components/ReservationDetail";
import SearchCriteria from "./components/SearchCriteria";
import ReservationTable from "./components/ReservationTable";

const filterData = (v, filters) =>
  v.firstName.toLowerCase().includes(filters.firstName.toLowerCase()) &&
  v.lastName.toLowerCase().includes(filters.lastName.toLowerCase()) &&
  v.email.toLowerCase().includes(filters.email.toLowerCase()) &&
  v.phone.includes(filters.phone) &&
  v.stay.arrivalDate.includes(filters.arrivalDate) &&
  v.stay.departureDate.includes(filters.departureDate);

const Home = () => {
  const [reservationData] = useContext(ReservationContext); // data list
  const [filter, setFilter] = useContext(FilterContext); // data list
  const [filteredData, setFilteredData] = useState(reservationData); // searched data
  const [curReservation, setCurReservation] = useState(null); //null: close Modal, {}: empty object, Add new reservation, {email:...} : not empty object, edit reservation

  useEffect(() => {
    const newDisplyData = reservationData.filter((v) => filterData(v, filter));
    setFilteredData(newDisplyData);
  }, [reservationData, filter, setFilteredData]);

  //Add new reservation
  const onAddNew = useCallback(() => {
    setCurReservation({});
  }, [setCurReservation]);

  //Edit reservation
  const onEdit = useCallback(
    (v) => {
      setCurReservation(v);
    },
    [setCurReservation]
  );

  //close reservation detail modal
  const onCloseModal = useCallback(() => {
    setCurReservation(null);
  }, [setCurReservation]);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Hotel reservation system
        </Typography>
        <Button
          variant="contained"
          sx={{ alignSelf: "flex-end" }}
          onClick={onAddNew}
        >
          Add new
        </Button>
      </Box>
      <SearchCriteria setFilter={setFilter} />
      <ReservationTable filteredData={filteredData} onEdit={onEdit} />
      {!!curReservation && (
        <ReservationDetail
          onClose={onCloseModal}
          reservation={curReservation}
        />
      )}
    </Container>
  );
};

export default Home;
