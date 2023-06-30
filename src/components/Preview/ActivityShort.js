import React from "react";
import activityImg from "../../images/activity_preview.jpg";

const ActivityShort = ({ activeList }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "-480px",
        left: "-197px",
      }}
    >
      <div
        style={{
          display: `flex`,
          justifyContent: `space-around`,
          flexDirection: `column`,
          backgroundColor: "#FFFFFF",
          width: "393px",
          height: "240px",
          padding: "35px 0 0 22px",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div>
            <div style={{ fontSize: `18pt`, fontWeight: `600` }}>
              {activeList.title}
            </div>
            <div style={{ fontSize: `14pt` }}>
              {activeList.sDate} ~ {activeList.eDate}
            </div>
            <div style={{ fontSize: `14pt` }}>{activeList.location}</div>
          </div>
          <img
            style={{ width: "80px", height: "80px" }}
            src={activityImg}
            alt="img"
          />
        </div>
        <div
          style={{
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            width: `349px`,
            height: `44px`,
            border: `#168249 solid 1px`,
            borderRadius: `10pt`,
            cursor: `pointer`,
          }}
        >
          자세히 보기
        </div>
      </div>
    </div>
  );
};

export default ActivityShort;
