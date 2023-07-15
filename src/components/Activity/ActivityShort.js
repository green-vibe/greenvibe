import React from "react";
import activityImg from "../../images/img_trash.svg";

const ActivityShort = ({ onViewActivityDetail, activeList }) => {
  const viewDetail = () => {
    onViewActivityDetail(true);
  };
  return (
    <div className="box-short-form-location">
      <div className="box-short-form">
        <div className="box-information">
          <div>
            <div className="title-text">{activeList.title}</div>
            <div className="date-text">
              {activeList.sDate} ~ {activeList.eDate}
            </div>
            <div className="location-text">{activeList.location}</div>
          </div>
          <div className="box-activity-img">
            <img src={activityImg} alt="activity" />
          </div>
        </div>
        <div onClick={viewDetail} className="btn-view-detail">
          자세히 보기
        </div>
      </div>
    </div>
  );
};

export default ActivityShort;
