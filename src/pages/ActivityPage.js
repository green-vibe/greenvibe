import React from "react";
import { useState, useEffect } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import { Wrapper } from "@googlemaps/react-wrapper";
import Autocomplete from "react-google-autocomplete";
import imgLocation from "../images/img_location.jpg";
import ActivityShort from "../components/Activity/ActivityShort";

const placesLibrary = ["places"];

const ActivityPage = () => {
  // 현재위치 나타내는 스테이트
  const [currentLocation, setCurrentLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [activity, setActivity] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);

  // 현재위치 api호출
  useEffect(() => {
    // 현재위치 찍기
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({ lat: latitude, lng: longitude });
    });
  }, []);

  // 구글맵 로드 (api키), 라이브러리
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API, // Add your API key
    libraries: placesLibrary,
  });

  useEffect(() => {
    if (map && currentLocation) {
      const center = new window.google.maps.LatLng(
        currentLocation.lat,
        currentLocation.lng
      );
      map.panTo(center);
    }
  }, [map, currentLocation]);

  const fetchActivity = async () => {
    let url = `http://localhost:3004/locations`;
    let res = await fetch(url);
    let data = await res.json();
    setActivity(data);
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  const handleActivity = (activeList) => {
    if (activeList === activeMarker) {
      return;
    }
    setActiveMarker(activeList);
  };

  const handleOnLoad = async (map) => {
    const bounds = await new window.google.maps.LatLngBounds();
    activity.forEach(({ lat, lon }) =>
      bounds.extend(new window.google.maps.LatLng(lat, lon))
    );
    map.fitBounds(bounds);
    map.setOptions({
      zoomControl: false, // 확대 및 축소 버튼 숨김
      mapTypeControl: false, // 지도 타입 선택 버튼 숨김
      streetViewControl: false, // Street View 버튼 숨김
      fullscreenControl: false, // 전체 화면 보기 버튼 숨김
    });
    setMap(map);
  };

  return isLoaded ? (
    <Wrapper apiKey={process.env.REACT_APP_MAP_API}>
      <GoogleMap
        onLoad={handleOnLoad}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={{
          width: "100vw",
          height: "100vh",
          paddingTop: "64px",
        }}
        zoom={20}
      >
        <div className="box-activity-input">
          <Autocomplete
            apiKey={process.env.REACT_APP_MAP_API}
            placeholder="챌린지 장소, 주소 검색"
          ></Autocomplete>
        </div>
        {currentLocation && (
          <Marker
            center={currentLocation}
            position={currentLocation}
            zoom={20}
            icon={{
              path: "M10 20c5.5 0 10-4.5 10-10S15.5 0 10 0 0 4.5 0 10s4.5 10 10 10z",
              strokeWeight: 3,
              strokeColor: "#FFFFFF",
              fillColor: "#386DFF",
              fillOpacity: 1,
              scale: 1,
            }}
          />
        )}
        {activity.map((activeList) => (
          <Marker
            key={activeList.id}
            position={{ lat: activeList.lat, lng: activeList.lng }}
            onClick={() => handleActivity(activeList.id)}
            icon={{
              url: imgLocation,
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          >
            <OverlayView
              position={{ lat: activeList.lat, lng: activeList.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: -13,
                  left: -100,
                  backgroundColor: "transparent",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  width: "200px",
                  fontSize: "8px",
                  color: "#222222",
                }}
              >
                {activeList.title}
              </div>
            </OverlayView>
            {activeMarker === activeList.id && (
              <OverlayView
                position={{ lat: activeList.lat, lng: activeList.lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <ActivityShort activeList={activeList} />
              </OverlayView>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </Wrapper>
  ) : null;
};

export default ActivityPage;
