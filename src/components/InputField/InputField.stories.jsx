import React from "react";
import { InputField } from "./InputField";
import { roomOptions, tagOptions } from "../../constants/constants";

export default {
  title: "InputField",
  component: InputField,
  argTypes: {},
};

const Template = (args) => <InputField {...args} />;

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  label: "InputText",
  labelAlign: "left",
  bottomLabel: "bottom label",
  bottomLabelAlign: "left",
  id: "text",
  type: "text",
  error: false,
  helperText: "",
};

export const Select = Template.bind({});

Select.args = {
  label: "Select",
  labelAlign: "left",
  bottomLabel: "bottom label",
  bottomLabelAlign: "left",
  id: "select",
  type: "select",
  options: roomOptions,
};

export const AutoComplete = Template.bind({});
AutoComplete.args = {
  label: "AutoComplete",
  labelAlign: "left",
  bottomLabel: "bottom label",
  bottomLabelAlign: "left",
  id: "text",
  type: "autoComplete",
  error: false,
  options: tagOptions,
};
