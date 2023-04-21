import React from "react";
import { Pagination } from "antd";

const PagiNation = ({ changePageNumber, totalData, defaultCurrent }) => (
  <>
    <Pagination
      simple
      defaultCurrent={defaultCurrent}
      total={totalData}
      className="pagination"
      onChange={changePageNumber}
    />
  </>
);

export default PagiNation;
