import React, { useState } from "react";
import activityImg from "../../images/img_trash.svg";
import closeIcon from "../../images/ic_close.svg";
import Description from "./Description";
import Confirm from "./Confirm";

const ActivityDetail = ({ activeList, onCloseActivityDetail }) => {
  const [confirmModal, setConfirmModal] = useState(false);

  const closeActivityDetail = () => {
    onCloseActivityDetail(true);
  };

  const showConfirm = () => {
    setConfirmModal(true);
  };

  return (
    <div className="box-detail-form-location">
      <div className="btn-close">
        <div onClick={closeActivityDetail}>
          <img src={closeIcon} alt="close" />
        </div>
      </div>
      <div className="box-detail-form">
        <div className="recycle-img-box">
          <img src={activityImg} alt="img" />
        </div>
        <div className="detail-information">
          <div className="info-title">{activeList.title}</div>
          <Description activeList={activeList} />
          <div className="duration-location-reward">
            <div>
              챌린지 기간{" "}
              <span>
                {activeList.sDate} ~ {activeList.eDate}
              </span>
            </div>
            <div>
              챌린지 장소 <span>{activeList.location}</span>
            </div>
            <div>
              챌린지 보상 <span>{activeList.reward}토큰</span>
            </div>
          </div>
        </div>
        <div>
          <div className="notice-rule">
            <div>모든 챌린지는 악용 방지를 위해 보증금을 필요로 합니다.</div>
            <div>보증금은 보상을 받을 때 포함하여 돌려드립니다.</div>
          </div>
          <div className="rule-start" onClick={showConfirm}>
            챌린지 시작하기
          </div>
        </div>
      </div>
      {confirmModal && (
        <div className="modal-background">
          <div className="modal-overlay" />
          <Confirm activeList={activeList} setConfirmModal={setConfirmModal} />
        </div>
      )}
    </div>
  );
};

export default ActivityDetail;
