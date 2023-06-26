import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

///////////////////////
// import components //
///////////////////////
import SolidButton from "../components/Button/SolidButton";

///////////////////
// import images //
///////////////////
import lgGreenToken from "../images/lg_greentoken.svg";
import imgZeroWaste from "../images/img_zero_waste.svg";

const ProfilePage = ({ fTokenBalanceOf, fNickname, fetchImageMetadata }) => {
  // navigate
  const navigate = useNavigate();

  const goToTokenExchange = () => {
    navigate("/token/exchange");
  };

  // userState
  let userState = useSelector((state) => state.user);

  const [nickname, setNickname] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");

  useEffect(() => {
    const initialize = async () => {
      const fetchedImageUrl = fetchImageMetadata();
      const real = await fetchedImageUrl;
      if (real) {
        userState.profileImageUrl = fetchedImageUrl;
      }
    };

    initialize();
  }, [fetchImageMetadata, userState]);

  useEffect(() => {
    if (userState.currentAccounts && userState.currentAccounts.length > 0) {
      fTokenBalanceOf().then((balance) => setTokenBalance(balance));

      const fetchNickname = async () => {
        const nickname = await fNickname();
        setNickname(nickname);
      };

      fetchNickname();
    }
  }, [userState.currentAccounts]);

  return (
    <div className="box-profile">
      <div className="box-profile-img">
        <img src={userState.profileImageUrl} alt="NFT 이미지" />
      </div>
      <span className="txt-nickname">{nickname}</span>
      <div className="box-balance">
        <div className="box-balance-top">
          <div className="box-balance-token">
            <div className="img-token">
              <img src={lgGreenToken} alt="tokenlogo" />
            </div>
            <div className="box-token-txt">
              <span className="txt-balance-exp">GreenToken</span>
              <span className="txt-balance">{tokenBalance} GRN</span>
            </div>
          </div>
          <div className="box-btn-token">
            <button className="btn-token" onClick={goToTokenExchange}>
              교환
            </button>
            <button className="btn-token">전송</button>
          </div>
        </div>
        <div className="box-balance-matic">
          <span className="txt-balance-exp">보유 MATIC</span>
          <span className="txt-balance">
            {Number(userState.ethBalance).toFixed(4)} MATIC
          </span>
        </div>
      </div>
      <div className="box-challenge-progress">
        <span className="txt-title">진행중인 챌린지</span>
        <div className="box-challenge">
          <div>
            <div className="box-challenge-img bg-light-blue">
              <img src={imgZeroWaste} alt="zero waste" />
            </div>
            <div className="box-challenge-txt">
              <span className="txt-title">제로웨이스트 챌린지</span>
              <span className="txt-subtitle">2023.06.01 ~ 2023.08.31</span>
              <span className="txt-subtitle">반포한강공원</span>
            </div>
          </div>
          <button className="btn-challenge-detail">현황 자세히 보기</button>
        </div>
      </div>
      <div className="box-challenge-vote">
        <span className="txt-title">다른 도전자를 응원해주세요!</span>
        <SolidButton value="응원하러 가기" disabled={false} />
      </div>
    </div>
  );
};

export default ProfilePage;
