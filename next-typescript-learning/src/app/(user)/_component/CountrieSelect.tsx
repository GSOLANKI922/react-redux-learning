import React from "react";
import { GET_COUNTRIES } from "../graphql/queries";
import InfiniteSelect from "./InfiniteSelect";

const variableSelector = ({ skip, limit }) => ({
  filter: { skip, limit },
});
const dataSelector = (data) =>
  data?.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

const dataKeys = {
  data: "activeTags",
  count: "count",
  records: "tags",
};

const CountrieSelect = (props) => (
  <InfiniteSelect
    searchable={false}
    query={GET_COUNTRIES}
    variableSelector={variableSelector}
    dataKeys={dataKeys}
    dataSelector={dataSelector}
    placeholder="Select Tag"
    {...props}
  />
);

export default CountrieSelect;
