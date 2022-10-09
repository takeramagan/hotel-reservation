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
import { pink } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import TextField from "./TextField";

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
  return (
    <Modal open={!!reservation} onClose={onClose} sx={{ overflow: "scroll" }}>
      <Box
        sx={{
          width: 800,
          margin: "auto",
        }}
      >
        <Paper sx={{ p: 2, mt: 4 }}>
          <Box>
            <Typography align="center" variant="h5">
              {reservation?.email ? "Edit reservation" : "Add reservation"}
            </Typography>
          </Box>
          <Box sx={{ my: 1 }}>
            <TextField
              id="arrivalDate"
              type="date"
              label="Date of Arrival"
              // value={formik.values.arrivalDate}
              // onChange={formik.handleChange}
            />
            <TextField
              id="departureDate"
              type="date"
              label="Date of Departure"
              // value={formik.values.departureDate}
              // onChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ my: 1 }}>
            <TextField
              id="room.roomSize"
              type="date"
              label="Room Size"
              bottomLabel="Choose a room type"
              // value={formik.values.arrivalDate}
              // onChange={formik.handleChange}
            />
            <TextField
              id="room.roomQuantity"
              type="number"
              label="Room Quantity"
              bottomLabel="Maximum: 5"
              // value={formik.values.departureDate}
              // onChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ my: 1 }}>
            <TextField
              id="firstName"
              label="First name"
              type="text"
              bottomLabel="3 / 25"
              bottomLabelAlign="right"
              // value={formik.values.firstName}
              // onChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ my: 1 }}>
            <TextField
              id="lastName"
              label="Last name"
              type="text"
              bottomLabel="3 / 50"
              bottomLabelAlign="right"
              // value={formik.values.lastName}
              // onChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ my: 1 }}>
            <TextField
              id="email"
              label="E-Mail"
              type="email"
              // value={formik.values.email}
              // onChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ my: 1 }}>
            <TextField
              id="phone"
              label="Phone Number"
              type="tel"
              bottomLabel="Add your country code first"
              // value={formik.values.phone}
              // onChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ my: 1 }}>
            <TextField
              id="addressStreet.streetName"
              type="text"
              label="Street Name"
              // value={formik.values.arrivalDate}
              // onChange={formik.handleChange}
            />
            <TextField
              id="addressStreet.streetNumber"
              type="text"
              label="Street Number"
              // value={formik.values.departureDate}
              // onChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ my: 1, display: "flex", flexDirection: "flex-start" }}>
            <TextField
              id="addressLocation.zipCode"
              type="text"
              label="ZIP"
              // value={formik.values.arrivalDate}
              // onChange={formik.handleChange}
            />
            <TextField
              id="addressLocation.state"
              type="text"
              label="State"
              bottomLabel="Autocomplete"
              // value={formik.values.departureDate}
              // onChange={formik.handleChange}
            />
            <TextField
              id="addressLocation.city"
              type="text"
              label="City"
              // value={formik.values.departureDate}
              // onChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ my: 1 }}>
            <TextField
              id="extras"
              type="text"
              label="Extras"
              // value={formik.values.departureDate}
              // onChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ my: 1, mx: 1 }}>
            <FormControl>
              <RadioGroup defaultValue="cc" name="payment-method" row>
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
            <TextField
              id="note"
              type="text"
              label="Personal Note"
              // value={formik.values.departureDate}
              // onChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ my: 1 }}>
            <TextField
              id="tags"
              type="text"
              label="Tags"
              // value={formik.values.departureDate}
              // onChange={formik.handleChange}
            />
          </Box>
          <Box sx={switchContainerStyle}>
            <PinkSwitch
              id="reminder"
              // checked={}
              // onChange={handleChange}
            />
            <Typography>Send me a reminder</Typography>
          </Box>
          <Box sx={switchContainerStyle}>
            <PinkSwitch
              id="newsletter"
              // checked={}
              // onChange={handleChange}
            />
            <Typography>Subscribe to newsletter</Typography>
          </Box>
          <Box sx={switchContainerStyle}>
            <Checkbox
              id="confirm"
              checked={true}
              onChange={(e) => console.log(e)}
              // value={formik.values.departureDate}
              // onChange={formik.handleChange}
            />
            <Typography>I confirm the information given above</Typography>
          </Box>
          <Button onClick={onClose}>Close Child Modal</Button>
        </Paper>
      </Box>
    </Modal>
  );
};

export default ReservationDetail;
