import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

///////////////////
// import images //
///////////////////
import bgMain from "../images/bg_main.svg";
import imgTrash from "../images/img_trash.svg";
import imgBicycle from "../images/img_bicycle.svg";
import imgZeroWaste from "../images/img_zero_waste.svg";
import imgZero from "../images/img_zero.jpg";
import imgZero2 from "../images/img_zero2.jpg";

const MainPage = ({ fNickname }) => {
  let currentAccounts = useSelector((state) => state.currentAccounts);

  // Nickname 불러오기
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (currentAccounts && currentAccounts.length > 0) {
      const fetchNickname = async () => {
        const nickname = await fNickname();
        setNickname(nickname);
      };
      fetchNickname();
    }
  }, [currentAccounts]);

  // 브라우저 너비 값에 맞게 width, height 값 가변 적용
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [imgStyle, setImgStyle] = useState({
    width: Number(Math.floor(windowWidth * 0.33333 * 1000) / 1000),
    height: Number(Math.floor(windowWidth * 0.33333 * 1000) / 1000),
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleResizeImg = () => {
      setImgStyle({
        width: Number(Math.floor(windowWidth * 0.33333 * 1000) / 1000),
        height: Number(Math.floor(windowWidth * 0.33333 * 1000) / 1000),
      });
    };

    window.addEventListener("resize", handleResize);
    handleResizeImg();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <div className="box-main">
      {/* Main title */}
      <div className="box-main-title">
        <img src={bgMain} alt="background" />
        <div className="box-main-txt">
          <span>지구를 지키는 챌린지,</span>
          <span className="txt-main-case">지금 함께 도전해요!</span>
        </div>
      </div>
      {/* Connect 여부 검사 */}
      {currentAccounts && currentAccounts.length > 0 ? (
        /* Connect */
        <div>
          <div className="box-connect">
            <span className="txt-title">
              {nickname}님의 챌린지를 시작해보세요!
            </span>
            {/* Challenge does not exist */}
            <button className="btn-challenge">도전하러 가기</button>
            {/* Challenge exists */}
            <div className="box-challenge">
              <div className="box-challenge-img bg-light-blue">
                <img src={imgZeroWaste} alt="zero waste" />
              </div>
              <div className="box-challenge-txt">
                <span className="txt-title">제로웨이스트 챌린지</span>
                <span className="txt-subtitle">이미지를 업로드 중이에요!</span>
              </div>
            </div>
          </div>
          {/* 도전자 없을 때 안 보이게 변경 필요 */}
          <div className="box-another-challenger">
            <p className="txt-title">
              지구를 지키는
              <br />
              또다른 도전자를 만나보세요
              <br />
            </p>
            <div className="box-another-challenge-img">
              <div className="box-upload-challenge-img" style={imgStyle}>
                <img src={imgZero} alt="anotehr challenge" />
              </div>
              <div className="box-upload-challenge-img" style={imgStyle}>
                <img src={imgZero2} alt="anotehr challenge" />
              </div>
              <div className="box-upload-challenge-img" style={imgStyle}>
                <img src={imgZero} alt="anotehr challenge" />
              </div>
              <div className="box-upload-challenge-img" style={imgStyle}>
                <img src={imgZero} alt="anotehr challenge" />
              </div>
              <div className="box-upload-challenge-img" style={imgStyle}>
                <img src={imgZero2} alt="anotehr challenge" />
              </div>
              <div className="box-upload-challenge-img" style={imgStyle}>
                <img src={imgZero} alt="anotehr challenge" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Not Connect
        <div className="box-not-connect">
          <span className="txt-title">지금 참여하고 지구를 지켜요!</span>
          <p className="txt-subtitle">
            그린바이브에서 지구를 지키는 챌린지에 참여하면
            <br />
            보상으로 토큰을 받을 수 있어요.
            <br />
            토큰을 이용해 지구를 지키는 제로웨이스트 상품도 살 수 있어요.
          </p>
          <div className="box-challenge-list">
            <div className="box-challenge">
              <div className="box-challenge-img bg-light-green">
                <img src={imgTrash} alt="trash" />
              </div>
              <div className="box-challenge-txt">
                <span className="txt-title">한강 쓰레기 줍깅 챌린지</span>
                <span className="txt-subtitle">
                  한강에서 쓰레기를 줍고 인증해보세요!
                </span>
              </div>
            </div>
            <div className="box-challenge">
              <div className="box-challenge-img bg-light-yellow">
                <img src={imgBicycle} alt="bicycle" />
              </div>
              <div className="box-challenge-txt">
                <span className="txt-title">자전거 출퇴근 챌린지</span>
                <span className="txt-subtitle">
                  자전거로 출퇴근하고 인증해보세요!
                </span>
              </div>
            </div>
            <div className="box-challenge">
              <div className="box-challenge-img bg-light-blue">
                <img src={imgZeroWaste} alt="zero waste" />
              </div>
              <div className="box-challenge-txt">
                <span className="txt-title">제로웨이스트 챌린지</span>
                <span className="txt-subtitle">
                  플라스틱 없는 삶을 인증해보세요!
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
