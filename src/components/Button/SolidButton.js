import React, { useEffect } from "react";

const SolidButton = ({ value, disabled }) => {
  useEffect(() => {
    const btnSelector = document.querySelector(".btn-solid");

    if (disabled) {
      btnSelector.disabled = true;
    } else {
      btnSelector.disabled = false;
    }
  }, [disabled]);

  return <button className="btn-solid">{value}</button>;
};

export default SolidButton;
