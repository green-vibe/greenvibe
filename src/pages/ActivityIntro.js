import React from "react";
import { Routes, Route } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import { Wrapper } from "@googlemaps/react-wrapper";
import ActivityPage from "./ActivityPage";
import ActivityImageUp from "./ActivityImageUp";

const placesLibrary = ["places"];

const ActivityIntro = () => {
  // 구글맵 로드 (api키), 라이브러리
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API, // Add your API key
    libraries: placesLibrary,
  });
  return isLoaded ? (
    <Wrapper apiKey={process.env.REACT_APP_MAP_API}>
      <Routes>
        <Route path="/" element={isLoaded && <ActivityPage />} />
        <Route path="/:id" element={isLoaded && <ActivityImageUp />} />
      </Routes>
    </Wrapper>
  ) : null;
};

export default ActivityIntro;
