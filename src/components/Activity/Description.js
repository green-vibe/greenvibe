import React from "react";

const Description = ({ activeList }) => {
  return (
    <div className="info-activity">
      {activeList.description.split("\n").map((txt) => (
        <>
          {txt}
          <br />
        </>
      ))}
    </div>
  );
};

export default Description;
