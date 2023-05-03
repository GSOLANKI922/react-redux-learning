import React from "react";

const Dummy = () => {
  return (
    <div>
      <style jsx global>
        {`
          .dummy {
            color: red;
          }
        `}
      </style>
      <span className="dummy">Dummy</span>
    </div>
  );
};

export default Dummy;
