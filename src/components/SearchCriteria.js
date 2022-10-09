import React, { useState } from "react";
import { Box, Form, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";

const SearchCriteria = () => {
  const [filter, setFilter] = useState({});
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      arrivalDate: "",
      departureDate: "",
    },
  });

  return (
    <Paper sx={{ my: 4, p: 2 }}>
      <Box sx={{ marginBottom: 2 }}>Search criteria</Box>
      <form>
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
      </form>
    </Paper>
  );
};

export default SearchCriteria;
