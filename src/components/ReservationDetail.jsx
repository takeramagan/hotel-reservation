import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import InputField from "./InputField";
import {
  extraService,
  roomOptions,
  tagOptions,
  validationSchema,
  initialFormValues,
} from "../constants/constants";
import { useFormik } from "formik";
import moment from "moment";
import reservationStore from "../store/reservationStore";

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

const ReservationDetail = ({ onClose, reservation }) => {
  const isEditing = !!reservation?.key;
  const [showDel, setShowDel] = useState(false); //show Alert dialog when delete clicked

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
      : initialFormValues,
    validationSchema,
    onSubmit: (values) => {
      isEditing ? reservationStore.edit(values) : reservationStore.add(values);
      onClose();
    },
  });

  const onDeleteClick = useCallback(() => {
    setShowDel(true);
  }, [setShowDel]);

  const onDelDialogClose = useCallback(() => {
    setShowDel(false);
  }, [setShowDel]);

  //Delete reservation
  const onConfirmDelete = useCallback(() => {
    reservationStore.delete(reservation);
    setShowDel(false);
    onClose();
  }, [setShowDel, reservation, onClose]);

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
                  !!formik.errors.stay?.arrivalDate
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
                  !!formik.errors.stay?.departureDate
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
                  !!formik.errors.room?.roomQuantity
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
                error={formik.touched.firstName && !!formik.errors.firstName}
                helperText={formik.touched.firstName && formik.errors.firstName}
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
                error={formik.touched.lastName && !!formik.errors.lastName}
                helperText={formik.touched.lastName && formik.errors.lastName}
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
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
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
                error={formik.touched.phone && !!formik.errors.phone}
                helperText={formik.touched.phone && formik.errors.phone}
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
                  !!formik.errors.addressStreet?.streetName
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
                  !!formik.errors.addressLocation?.zipCode
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
                  !!formik.errors.addressLocation?.state
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
                  !!formik.errors.addressLocation?.city
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box>
                {isEditing && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={onDeleteClick}
                  >
                    Delete
                  </Button>
                )}
              </Box>
              <Box>
                <Button onClick={onClose} variant="stardard">
                  Close
                </Button>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
        <Dialog
          open={showDel}
          // TransitionComponent={Transition}
          keepMounted
          onClose={onDelDialogClose}
        >
          <DialogTitle>{"Confirm delete?"}</DialogTitle>
          <DialogActions>
            <Button onClick={onDelDialogClose}>Cancel</Button>
            <Button onClick={onConfirmDelete} variant="contained" color="error">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Modal>
  );
};

export default ReservationDetail;
