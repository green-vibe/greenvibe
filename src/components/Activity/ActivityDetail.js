import React from "react";
import activityImg from "../../images/recycle-img.jpg";
import Description from "./Description";

const ActivityDetail = ({ activeList, onCloseActivityDetail }) => {
  const closeActivityDetail = () => {
    onCloseActivityDetail(true);
  };

  return (
    <div className="box-detail-form-location">
      <div className="btn-close">
        <div onClick={closeActivityDetail}>X</div>
      </div>
      <div className="box-detail-form">
        <div className="recycle-img-box">
          <img src={activityImg} alt="img" />
        </div>
        <div className="detail-information">
          <div className="info-title">{activeList.title}</div>
          <div className="info-activity">
            <Description activeList={activeList} />
          </div>
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
          <div className="rule-start">챌린지 시작하기</div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
