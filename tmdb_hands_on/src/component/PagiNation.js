import React from "react";
import { Pagination } from "antd";

const PagiNation = ({ changePageNumber, totalData }) => (
  <>
    <Pagination
      simple
      defaultCurrent={1}
      total={totalData}
      style={{ position: "absolute", top: "62rem" }}
      onChange={changePageNumber}
    />
  </>
);

export default PagiNation;
