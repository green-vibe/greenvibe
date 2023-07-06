import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import recycleImg from "../images/recycle-img.jpg";

const ActivityImageUp = () => {
  const [activityImgUpload, setActivityImgUpload] = useState();
  let { id } = useParams();
  const getActivityDetail = async () => {
    let url = `http://localhost:3004/locations/${id}`;
    let res = await fetch(url);
    let data = await res.json();
    setActivityImgUpload(data);
  };
  useEffect(() => {
    getActivityDetail();
  }, []);
  return (
    <div>
      <div className="activity-information">
        <div>
          <div className="act-detail-title">
            {activityImgUpload?.title}
            <br />
            챌린지가 시작되었어요!
          </div>
          <div className="act-detail-period">
            {activityImgUpload?.sDate} ~ {activityImgUpload?.eDate}
          </div>
          <div className="act-detail-location">
            {activityImgUpload?.location}
          </div>
          <div className="act-detail-reward">
            <span>챌린지 보상</span>
            <span>{activityImgUpload?.reward}토큰</span>
          </div>
        </div>
        <img src={recycleImg} alt="recycleImg" />
      </div>
      <div className="img-information">
        <div className="activity-text-ing">
          진행중인 챌린지의
          <br />
          이미지를 올려주세요!
        </div>
        <div>
          <div className="img-upload-box">
            <div className="img-upload"></div>
            <div className="img-upload"></div>
          </div>
          <div className="img-upload-box">
            <div className="img-upload"></div>
            <div className="img-upload"></div>
          </div>
        </div>
      </div>
      <div className="voting-button-box">
        <div className="voting-rule">
          <div>모든 챌린지는 악용방지를 위해 보증금을 필요로 합니다.</div>
          <div>보증금은 보상을 받을 때 포함하여 돌려드립니다.</div>
        </div>
        <div className="btn-votingup">투표 올리기</div>
      </div>
    </div>
  );
};

export default ActivityImageUp;
