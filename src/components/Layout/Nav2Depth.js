import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import icLeftArrow from "../../images/ic_left_arrow.svg";

const Nav2Depth = ({ location }) => {
  // Navigate
  const navigate = useNavigate();

  const goToBack = () => {
    navigate("/profile");
  };

  // PageTitle
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    if (location.pathname === "/token/exchange") {
      setPageTitle("토큰 교환");
    } else if (location.pathname === "/token/tranfer") {
      setPageTitle("토큰 전송");
    }
  }, [location]);

  return (
    <div className="box-nav-2depth">
      <button onClick={goToBack}>
        <img src={icLeftArrow} alt="back" />
      </button>
      <span>{pageTitle}</span>
    </div>
  );
};

export default Nav2Depth;
