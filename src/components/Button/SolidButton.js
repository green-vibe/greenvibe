import React, { useEffect } from "react";

const SolidButton = ({ value, disabled, onClick }) => {
  useEffect(() => {
    const btnSelector = document.querySelector(".btn-solid");

    if (disabled) {
      btnSelector.disabled = true;
    } else {
      btnSelector.disabled = false;
    }
  }, [disabled]);

  return (
    <button className="btn-solid" onClick={onClick}>
      {value}
    </button>
  );
};

export default SolidButton;
