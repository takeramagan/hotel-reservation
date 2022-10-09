import React, { useCallback, useContext, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
} from "@mui/material";
import moment from "moment";
import ReservationContext from "./ReservationContext";
import ReservationDetail from "./components/ReservationDetail";
import SearchCriteria from "./components/SearchCriteria";

const Home = () => {
  const [context, setContext] = useContext(ReservationContext); // data list
  const [filteredData, setFilteredData] = useState(context); // searched data
  const [showDel, setShowDel] = useState(false); //show Alert dialog when delete clicked
  const [curReservation, setCurReservation] = useState(null); //null: close Modal, {}: empty object, Add new reservation, {email:...} : not empty object, edit reservation

  const onSearchSubmit = useCallback(
    (filters) => {
      const resultData = context.filter(
        (v) =>
          v.firstName.toLowerCase().includes(filters.firstName.toLowerCase()) &&
          v.lastName.toLowerCase().includes(filters.lastName.toLowerCase()) &&
          v.email.toLowerCase().includes(filters.email.toLowerCase()) &&
          v.phone.includes(filters.phone.toLowerCase()) &&
          v.stay.arrivalDate.includes(filters.arrivalDate) &&
          v.stay.departureDate.includes(filters.departureDate)
      );
      setFilteredData(resultData);
    },
    [context, setFilteredData]
  );

  const onDeleteClick = useCallback(() => {
    setShowDel(true);
  }, [setShowDel]);

  const onDelDialogClose = useCallback(() => {
    setShowDel(false);
  }, [setShowDel]);

  //Delete reservation
  const onDeleteItem = useCallback(() => {
    console.log("confirm delete");
    setShowDel(false);
  }, [setShowDel]);

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
      <SearchCriteria onSearchSubmit={onSearchSubmit} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1080 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Room</TableCell>
              <TableCell align="center">Arrival</TableCell>
              <TableCell align="center">Departure</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!filteredData.length && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No data found
                </TableCell>
              </TableRow>
            )}
            {filteredData.map((row) => {
              const {
                firstName,
                lastName,
                room: { roomSize, roomQuantity },
                email,
                phone,
                stay: { arrivalDate, departureDate },
              } = row;
              return (
                <TableRow
                  key={`${firstName}-${lastName}`}
                  onDoubleClick={() => {
                    onEdit(row);
                  }}
                >
                  <TableCell align="center">{firstName}</TableCell>
                  <TableCell align="center">{lastName}</TableCell>
                  <TableCell align="center">{`${roomSize} ${roomQuantity}`}</TableCell>
                  <TableCell align="center">
                    {moment(arrivalDate).format("YYYY-MM-DD HH:MM")}
                  </TableCell>
                  <TableCell align="center">
                    {moment(departureDate).format("YYYY-MM-DD HH:MM")}
                  </TableCell>
                  <TableCell align="center">{email}</TableCell>
                  <TableCell align="center">{phone}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={onDeleteClick}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={showDel}
        // TransitionComponent={Transition}
        keepMounted
        onClose={onDelDialogClose}
      >
        <DialogTitle>{"Confirm delete?"}</DialogTitle>
        <DialogActions>
          <Button onClick={onDelDialogClose}>Cancel</Button>
          <Button onClick={onDeleteItem}>Confirm</Button>
        </DialogActions>
      </Dialog>
      <ReservationDetail onClose={onCloseModal} reservation={curReservation} />
    </Container>
  );
};

export default Home;
