import React, { useCallback, useContext } from "react";
import { Box, Button, Paper } from "@mui/material";
import { useFormik } from "formik";
import InputField from "./InputField";
import { FilterContext } from "../context/Context";
import { filterInitData } from "../constants/constants";

const SearchCriteria = () => {
  const [filter, setFilter] = useContext(FilterContext);
  const formik = useFormik({
    initialValues: filterInitData,
    onSubmit: (values) => {
      // onSearchSubmit(values);
      setFilter(values);
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
          <InputField
            id="firstName"
            label="First name"
            type="text"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          <InputField
            id="lastName"
            label="Last name"
            type="text"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          <InputField
            id="email"
            label="Email"
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <InputField
            id="phone"
            label="Phone"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
        </Box>
        <Box sx={{ my: 2 }}>
          <InputField
            id="arrivalDate"
            label="Arrival date"
            type="date"
            value={formik.values.arrivalDate}
            onChange={formik.handleChange}
          />
          <InputField
            id="departureDate"
            label="Departure date"
            type="date"
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