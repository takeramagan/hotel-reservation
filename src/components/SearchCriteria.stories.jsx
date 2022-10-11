import React from "react";
import SearchCriteria from "./SearchCriteria";

export default {
  title: "SearchCriteria",
  component: SearchCriteria,
  argTypes: {},
};

const Template = (args) => <SearchCriteria {...args} />;

export const SearchBar = Template.bind({});

SearchBar.args = {
  setFilter: () => {},
};
