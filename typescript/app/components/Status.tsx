import React from "react";
type StatueProps = {
  status: "loading" | "success" | "error";
};
const Status = (props: StatueProps) => {
  let message;
  if (props.status === "loading") {
    message = "Loading...";
  } else if (props.status === "success") {
    message = "Data fetching successfully!";
  } else if (props.status === "error") {
    message = "Error fetching data";
  }
  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default Status;
