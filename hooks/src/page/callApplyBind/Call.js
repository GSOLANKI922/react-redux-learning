import React, { useEffect } from "react";

const Call = () => {
  const teacher = {
    name: "gautam",
    sName: "SOlanki",
    Age: 36,
  };

  const student = {
    name: "Bhautik",
    sName: "SOlanki",
    Age: 36,
    grtMail() {
      console.log(this.name, "thisMain");
    },
  };

  student.grtMail();

  const getGmail = (obj) => {
    return `${obj.name}${obj.sName}@gmail.com`;
  };

  console.log(getGmail(teacher));
                                                                                                 
  return <div></div>;
};

export default Call;
