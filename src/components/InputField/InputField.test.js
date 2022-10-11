import { render, screen } from "@testing-library/react";
import { InputField } from "./InputField";
import { roomOptions, tagOptions } from "../../constants/constants";

const defaultInputArgs = {
  label: "default input",
  labelAlign: "left",
  bottomLabel: "bottom label",
  bottomLabelAlign: "left",
  id: "text",
  type: "text",
  error: false,
  helperText: "",
  value: "testvalue",
};

const selectArgs = {
  label: "Select",
  labelAlign: "left",
  bottomLabel: "bottom label",
  bottomLabelAlign: "left",
  id: "select",
  name: "select",
  type: "select",
  options: roomOptions,
  value: "business-suite",
};

const autoCompleteArgs = {
  label: "AutoComplete",
  labelAlign: "left",
  bottomLabel: "bottom label",
  bottomLabelAlign: "left",
  id: "text",
  type: "autoComplete",
  name: "autocomplete-input",
  options: tagOptions,
};

describe("InputField", () => {
  it("text input", () => {
    render(<InputField {...defaultInputArgs} />);
    expect(screen.getByText("default input")).toBeInTheDocument();
    expect(screen.getByDisplayValue("testvalue")).toBeInTheDocument();
    expect(screen.getByText("bottom label")).toBeInTheDocument();
  });
  it("select", () => {
    render(<InputField {...selectArgs} />);
    expect(screen.getByText("Select")).toBeInTheDocument();
    expect(screen.getByText("bottom label")).toBeInTheDocument();
  });
  it("multiselect", () => {
    render(<InputField {...selectArgs} multiple value={[roomOptions[0]]} />);
    expect(screen.getByText("Select")).toBeInTheDocument();
    expect(screen.getByDisplayValue([roomOptions[0]])).toBeInTheDocument();
    expect(screen.getByText("bottom label")).toBeInTheDocument();
  });
  it("autocomplete", () => {
    render(<InputField {...autoCompleteArgs} />);
    expect(screen.getByText("AutoComplete")).toBeInTheDocument();
    expect(screen.getByText("bottom label")).toBeInTheDocument();
  });
});
