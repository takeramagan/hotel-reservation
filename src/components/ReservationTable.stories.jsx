import React from "react";
import ReservationTable from "./ReservationTable";
import reservations from "../reservations.json";

export default {
  title: "ReservationTable",
  component: ReservationTable,
  argTypes: {},
};

const Template = (args) => <ReservationTable {...args} />;

export const ResultTable = Template.bind({});
ResultTable.args = {
  onEdit: () => {},
  filteredData: reservations.map((v, i) => ({ ...v, key: i + 1 })),
};

export const EmptyTable = Template.bind({});
EmptyTable.args = {
  onEdit: () => {},
  filteredData: [],
};
