import React from "react";
import ReservationDetail from "./ReservationDetail";
import reservations from "../reservations.json";

export default {
  title: "ReservationDetail",
  component: ReservationDetail,
  argTypes: {},
};

const Template = (args) => <ReservationDetail {...args} />;

export const AddNew = Template.bind({});
AddNew.args = {
  onClose: () => {},
  reservation: {},
};

export const Edit = Template.bind({});

Edit.args = {
  onClose: () => {},
  reservation: { ...reservations[0], key: 1 },
};
