import React from "react";
import { Pagination } from "antd";

const PagiNation = ({ changePageNumber, totalData, defaultCurrent }) => (
  <>
    <Pagination
      simple
      defaultCurrent={defaultCurrent}
      total={totalData}
      style={{ position: "absolute", top: "62rem" }}
      onChange={changePageNumber}
    />
  </>
);

export default PagiNation;
