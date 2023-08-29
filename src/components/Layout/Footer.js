import React from "react";
import { useLocation } from "react-router-dom";
import lgGreenVibeGray from "../../images/lg_greenvibe_gray.svg";

const Footer = () => {
  const locationNow = useLocation();

  if (locationNow.pathname.substring(0, 9) === "/activity") return null;
  return (
    <div className="box-footer">
      <div className="box-footer-top">
        <button className="btn-footer">이용약관</button>
        <button className="btn-footer">개인정보처리방침</button>
      </div>
      <div>
        <button className="btn-footer">고객센터</button>
        <button className="btn-footer">Github</button>
        <button className="btn-footer">Developers</button>
      </div>
      <img className="lg-greenvibe" src={lgGreenVibeGray} alt="logo" />
    </div>
  );
};

export default Footer;
