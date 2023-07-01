import React from "react";
import activityImg from "../../images/activity_preview.jpg";

const ActivityShort = ({ activeList }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: `10%`,
        left: "50%",
        transform: "translate(-100%, 100%)",
      }}
    >
      <div
        style={{
          display: `flex`,
          justifyContent: `space-around`,
          flexDirection: `column`,
          alignItems: `center`,
          backgroundColor: "#FFFFFF",
          width: "100vw",
          height: "240px",
          padding: "35px 0 0 22px",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: `349px`,
          }}
        >
          <div>
            <div style={{ fontSize: `18px`, fontWeight: `600` }}>
              {activeList.title}
            </div>
            <div
              style={{ fontSize: `14px`, marginTop: `6px`, color: `#AAAAAA` }}
            >
              {activeList.sDate} ~ {activeList.eDate}
            </div>
            <div
              style={{ fontSize: `14px`, marginTop: `10px`, color: `#222222` }}
            >
              {activeList.location}
            </div>
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
            fontSize: `19pt`,
            color: `#168249`,
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