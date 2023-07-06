import React from "react";
import { useNavigate } from "react-router-dom";

const Confirm = ({ setConfirmModal, activeList }) => {
  const navigator = useNavigate();
  const goToImgUploadPage = () => {
    navigator(`/activity/${activeList.id}`);
  };
  const cancleActivity = () => {
    setConfirmModal(false);
  };
  return (
    <div className="background-modal">
      <div className="confirm-modal">
        <div className="title-activity-start">
          {activeList.title}
          <br /> 챌린지를 시작하시겠어요?
        </div>
        <div className="deposit-rule">
          시작 클릭시 1 MATIC의 보증금이 차감됩니다
        </div>
        <div className="cancel-start">
          <div onClick={cancleActivity}>취소</div>
          <div onClick={goToImgUploadPage}>시작</div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
