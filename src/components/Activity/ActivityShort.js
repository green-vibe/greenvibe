import React from "react";
import activityImg from "../../images/activity_preview.jpg";

const ActivityShort = ({ activeList }) => {
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
          <img src={activityImg} alt="img" />
        </div>
        <div className="btn-view-detail">자세히 보기</div>
      </div>
    </div>
  );
};

export default ActivityShort;
