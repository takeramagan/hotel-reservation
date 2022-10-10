import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { pink } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import InputField from "./InputField";
import { extraService, roomOptions, tagOptions } from "../constants/constants";
import { useFormik, yupToFormErrors } from "formik";
import moment, { now } from "moment";
import reservationData from "../reservations.json";

const PaymentRadio = <Radio sx={{ "&.Mui-checked": { color: pink[400] } }} />;

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[400],
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[400],
  },
}));

const switchContainerStyle = {
  my: 1,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const validationSchema = yup.object({
  firstName: yup
    .string("Enter your first Name")
    .min(3, "Min 3 length")
    .max(25, "Max 25 length")
    .matches(/^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/, "Invalid name")
    .required("Required"),
  lastName: yup
    .string("Enter your last Name")
    .min(3, "Min 3 length")
    .max(50, "Max 50 length")
    .matches(/^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/, "Invalid name")
    .required("Required"),
  email: yup
    .string("Enter your email")
    .max(64, "Max 64 length")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid email")
    .required("Email is required"),
  stay: yup.object({
    arrivalDate: yup.string().required("Required"),
    departureDate: yup.string().required("Required"),
  }),
  room: yup.object({
    roomSize: yup.string().required("Required"),
    roomQuantity: yup
      .number()
      .min(1, "Min 1")
      .max(5, "max 5")
      .required("Required"),
  }),
  phone: yup
    .string()
    .matches(/^[1-9]\d{10,13}$/, "Invalid")
    .required("Required"),
  addressStreet: yup.object({
    streetName: yup.string().required("Required"),
  }),
  addressLocation: yup.object({
    zipCode: yup
      .string()
      .required("Required")
      .matches(
        /^\d{5}-\d{4}|\d{5}|[a-zA-Z]\d[a-zA-Z] \d[a-zA-Z]\d|[a-zA-Z]\d[a-zA-Z]\d[a-zA-Z]\d$/,
        "Invalid"
      ),
    state: yup.string().required("Required"),
    city: yup.string().required("Required"),
  }),
});

const initialValues = {
  room: { roomSize: "business-suite" },
  extras: [],
  tags: [],
  stay: {
    arrivalDate: "",
    departureDate: "",
  },
  addressStreet: {
    streetName: "",
    streetNumber: "",
  },
  addressLocation: {
    zipCode: "",
    state: "",
    city: "",
  },
  reminder: true,
  newsletter: true,
  confirm: true,
};

const ReservationDetail = ({ onClose, reservation }) => {
  const isEditing = !!reservation?.email; //normally use key property
  const formik = useFormik({
    initialValues: isEditing
      ? {
          ...reservation,
          stay: {
            //original data has to be formated to YYYY-MM-DD
            arrivalDate: moment(reservation?.stay?.arrivalDate).format(
              "YYYY-MM-DD"
            ),
            departureDate: moment(reservation?.stay?.departureDate).format(
              "YYYY-MM-DD"
            ),
          },
        }
      : initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Modal open={!!reservation} onClose={onClose} sx={{ overflow: "scroll" }}>
      <Box
        sx={{
          width: 800,
          margin: "auto",
        }}
      >
        <Paper sx={{ p: 2, mt: 4 }}>
          <form onSubmit={formik.handleSubmit}>
            <Box>
              <Typography align="center" variant="h5">
                {reservation?.email ? "Edit reservation" : "Add reservation"}
              </Typography>
            </Box>
            <Box sx={{ my: 1 }}>
              <InputField
                id="stay.arrivalDate"
                type="date"
                label="Date of Arrival"
                value={formik.values.stay?.arrivalDate}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.stay?.arrivalDate &&
                  formik.errors.stay?.arrivalDate
                }
                helperText={
                  formik.touched.stay?.arrivalDate &&
                  formik.errors.stay?.arrivalDate
                }
                onChange={formik.handleChange}
              />
              <InputField
                id="stay.departureDate"
                type="date"
                label="Date of Departure"
                value={formik.values.stay?.departureDate}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.stay?.departureDate &&
                  formik.errors.stay?.departureDate
                }
                helperText={
                  formik.touched.stay?.departureDate &&
                  formik.errors.stay?.departureDate
                }
                onChange={formik.handleChange}
              />
            </Box>
            <Box sx={{ my: 1 }}>
              <InputField
                id="room.roomSize"
                type="select"
                label="Room Size"
                bottomLabel="Choose a room type"
                options={roomOptions}
                value={formik.values.room?.roomSize}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <InputField
                id="room.roomQuantity"
                type="number"
                label="Room Quantity"
                bottomLabel="Maximum: 5"
                value={formik.values.room.roomQuantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.room?.roomQuantity &&
                  formik.errors.room?.roomQuantity
                }
              />
            </Box>
            <Box sx={{ my: 1 }}>
              <InputField
                id="firstName"
                label="First name"
                type="text"
                bottomLabel="3 / 25"
                bottomLabelAlign="right"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                formik={formik}
              />
            </Box>
            <Box sx={{ my: 1 }}>
              <InputField
                id="lastName"
                label="Last name"
                type="text"
                bottomLabel="3 / 50"
                bottomLabelAlign="right"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                formik={formik}
              />
            </Box>
            <Box sx={{ my: 1 }}>
              <InputField
                id="email"
                label="E-Mail"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                formik={formik}
              />
            </Box>
            <Box sx={{ my: 1 }}>
              <InputField
                id="phone"
                label="Phone Number"
                type="tel"
                bottomLabel="Add your country code first"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                formik={formik}
              />
            </Box>
            <Box sx={{ my: 1 }}>
              <InputField
                id="addressStreet.streetName"
                type="text"
                label="Street Name"
                value={formik.values.addressStreet?.streetName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.addressStreet?.streetName &&
                  formik.errors.addressStreet?.streetName
                }
                helperText={
                  formik.touched.addressStreet?.streetName &&
                  formik.errors.addressStreet?.streetName
                }
              />
              <InputField
                id="addressStreet.streetNumber"
                type="text"
                label="Street Number"
                value={formik.values.addressStreet?.streetNumber}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Box>
            <Box sx={{ my: 1, display: "flex", flexDirection: "flex-start" }}>
              <InputField
                id="addressLocation.zipCode"
                type="text"
                label="ZIP"
                value={formik.values.addressLocation?.zipCode}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.addressLocation?.zipCode &&
                  formik.errors.addressLocation?.zipCode
                }
                helperText={
                  formik.touched.addressLocation?.zipCode &&
                  formik.errors.addressLocation?.zipCode
                }
              />
              <InputField
                id="addressLocation.state"
                type="text"
                label="State"
                bottomLabel="Autocomplete"
                value={formik.values.addressLocation?.state}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.addressLocation?.state &&
                  formik.errors.addressLocation?.state
                }
                helperText={
                  formik.touched.addressLocation?.state &&
                  formik.errors.addressLocation?.state
                }
              />
              <InputField
                id="addressLocation.city"
                type="text"
                label="City"
                value={formik.values.addressLocation?.city}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.addressLocation?.city &&
                  formik.errors.addressLocation?.city
                }
                helperText={
                  formik.touched.addressLocation?.city &&
                  formik.errors.addressLocation?.city
                }
              />
            </Box>
            <Box sx={{ my: 1 }}>
              <InputField
                id="extras"
                type="select"
                multiple
                label="Extras"
                options={extraService}
                value={formik.values.extras}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Box>
            <Box sx={{ my: 1, mx: 1 }}>
              <FormControl>
                <RadioGroup
                  name="payment"
                  defaultValue="cc"
                  row
                  value={formik.values.payment}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="cc"
                    control={PaymentRadio}
                    label="Credit Card"
                  />
                  <FormControlLabel
                    value="pp"
                    control={PaymentRadio}
                    label="PayPal"
                  />
                  <FormControlLabel
                    value="cash"
                    control={PaymentRadio}
                    label="Cash"
                  />
                  <FormControlLabel
                    value="bit"
                    control={PaymentRadio}
                    label="Bitcoin"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ my: 1 }}>
              <InputField
                id="note"
                type="text"
                label="Personal Note"
                multiline
                minRows={2}
                maxRows={4}
                value={formik.values.note}
                onChange={formik.handleChange}
              />
            </Box>
            <Box sx={{ my: 1 }}>
              <InputField
                id="tags"
                type="autoComplete"
                label="Tags"
                options={tagOptions}
                value={formik.values.tags}
                formik={formik}
                // onChange={formik.handleChange}
                sx={{ display: "flex" }}
              />
            </Box>
            <Box sx={switchContainerStyle}>
              <PinkSwitch
                id="reminder"
                checked={formik.values.reminder}
                onChange={formik.handleChange}
              />
              <Typography>Send me a reminder</Typography>
            </Box>
            <Box sx={switchContainerStyle}>
              <PinkSwitch
                id="newsletter"
                checked={formik.values.newsletter}
                onChange={formik.handleChange}
              />
              <Typography>Subscribe to newsletter</Typography>
            </Box>
            <Box sx={switchContainerStyle}>
              <Checkbox
                id="confirm"
                checked={formik.values.confirm}
                onChange={formik.handleChange}
              />
              <Typography>I confirm the information given above</Typography>
            </Box>
            <Button onClick={onClose}>Close Child Modal</Button>
            <Button variant="standard" type="submit">
              Add
            </Button>
          </form>
        </Paper>
      </Box>
    </Modal>
  );
};

export default ReservationDetail;
