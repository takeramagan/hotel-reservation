import React from "react";
import moment from "moment";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
} from "@mui/material";

export const ReservationTable = ({ filteredData, onEdit }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1080 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Room</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Arrival</TableCell>
            <TableCell align="center">Departure</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone</TableCell>
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
          {!!filteredData.length &&
            filteredData.map((row) => {
              const {
                firstName,
                lastName,
                room: { roomSize, roomQuantity },
                email,
                phone,
                stay: { arrivalDate, departureDate },
                key,
              } = row;
              return (
                <TableRow
                  key={`key-${key}`}
                  onDoubleClick={() => {
                    onEdit(row);
                  }}
                >
                  <TableCell align="center">{firstName}</TableCell>
                  <TableCell align="center">{lastName}</TableCell>
                  <TableCell align="center">{roomSize}</TableCell>
                  <TableCell align="center">{roomQuantity}</TableCell>
                  <TableCell align="center">
                    {moment(arrivalDate).format("YYYY-MM-DD HH:MM")}
                  </TableCell>
                  <TableCell align="center">
                    {moment(departureDate).format("YYYY-MM-DD HH:MM")}
                  </TableCell>
                  <TableCell align="center">{email}</TableCell>
                  <TableCell align="center">{phone}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
