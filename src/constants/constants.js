import * as yup from "yup";
import moment from "moment";

const roomOptions = [
  { value: "business-suite", label: "Business Suite" },
  { value: "presidential-suite", label: "Presidential Suite" },
  { value: "double-suite", label: "Double Suite" },
  { value: "single-suite", label: "Single Suite" },
];

const extraService = [
  { value: "extraBreakfast", label: "Breakfast" },
  { value: "extraTV", label: "TV" },
  { value: "extraWiFi", label: "WiFi" },
  { value: "extraParking", label: "Parking" },
  { value: "extraBalcony", label: "Balcony" },
];

const tagOptions = ["hotel", "booking", "labtest", "angular", "material"];

const filterInitData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  arrivalDate: "",
  departureDate: "",
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
    departureDate: yup
      .string()
      .required("Required")
      .test("larger", "Departure >= arrival", function match(v) {
        const ref = yup.ref("arrivalDate");
        return moment(v) >= moment(ref);
      }),
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

const initialFormValues = {
  room: { roomSize: "business-suite", roomQuantity: 1 },
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
  payment: "cc",
  reminder: true,
  newsletter: true,
  confirm: true,
};

export {
  initialFormValues,
  validationSchema,
  roomOptions,
  extraService,
  filterInitData,
  tagOptions,
};
