import React, { useCallback, useState } from "react";
import { Box, Button, Form, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";

const SearchCriteria = ({ onSearchSubmit }) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      arrivalDate: "",
      departureDate: "",
    },
    onSubmit: (values) => {
      onSearchSubmit(values);
    },
  });

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      formik.handleSubmit(e);
    },
    [formik]
  );

  return (
    <Paper sx={{ my: 4, p: 2 }}>
      <Box sx={{ marginBottom: 2 }}>Search criteria</Box>
      <form onSubmit={onSubmit}>
        <Box>
          <TextField
            id="firstName"
            label="First name"
            type="text"
            size="small"
            sx={{ m: 1 }}
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          <TextField
            id="lastName"
            label="Last name"
            type="text"
            size="small"
            sx={{ m: 1 }}
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            size="small"
            sx={{ m: 1 }}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField
            id="phone"
            label="Phone"
            type="tel"
            size="small"
            sx={{ m: 1 }}
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
        </Box>
        <Box
          sx={{
            mt: 2,
            mx: 1,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <Typography variant="h8">Arrival date : </Typography>
          <TextField
            id="arrivalDate"
            type="date"
            size="small"
            sx={{ mx: 1 }}
            value={formik.values.arrivalDate}
            onChange={formik.handleChange}
          />
          <Typography variant="h8">Departure date : </Typography>
          <TextField
            id="departureDate"
            type="date"
            size="small"
            sx={{ mx: 1 }}
            value={formik.values.departureDate}
            onChange={formik.handleChange}
          />
        </Box>
        <Button variant="contained" type="submit" sx={{ mt: 2, ml: 1 }}>
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default SearchCriteria;
