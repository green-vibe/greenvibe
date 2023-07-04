import React from "react";

const ActivityDetail = ({ activeList, closeActivityDetail }) => {
  return (
    <div className="box-short-form-location">
      <div className="activity-detail">
        <h2>안녕안녕</h2>
        <p>Start Date: 1234</p>
        <p>End Date: 12345</p>
        <p>Location: 공원공원</p>
        <button onClick={closeActivityDetail}>Close</button>
      </div>
    </div>
  );
};

export default ActivityDetail;
