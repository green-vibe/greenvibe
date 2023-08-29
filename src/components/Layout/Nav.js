import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

///////////////////
// import images //
///////////////////
import lgGreenvibe from "../../images/lg_greenvibe.svg";
import icConnect from "../../images/ic_connect.svg";
import icProfile from "../../images/ic_profile.svg";

const Nav = ({ connectToMetaMask }) => {
  const navigate = useNavigate();
  let currentAccounts = useSelector((state) => state.user.currentAccounts);

  // Main 이동
  const goToMain = () => {
    navigate("/");
  };

  // Profile 이동
  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="box-nav">
      <button className="btn-nav-main" onClick={goToMain}>
        <img src={lgGreenvibe} alt="logo" />
      </button>
      {currentAccounts.length === 0 ? (
        // Metamask에 연결되지 않았을 때
        <button className="btn-nav-connect" onClick={connectToMetaMask}>
          <img src={icConnect} alt="connect" />
        </button>
      ) : (
        // Metamask와 연결되었을 때
        <button className="btn-nav-profile" onClick={goToProfile}>
          <img src={icProfile} alt="profile" />
        </button>
      )}
    </div>
  );
};

export default Nav;
