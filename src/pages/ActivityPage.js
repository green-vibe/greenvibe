import React from "react";
import { useState, useEffect } from "react";
import { GoogleMap, Marker, OverlayView } from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";
import imgLocation from "../images/img_location.jpg";
import ActivityShort from "../components/Activity/ActivityShort";
import ActivityDetail from "../components/Activity/ActivityDetail";

// const placesLibrary = ["places"];

const ActivityPage = () => {
  // 현재위치 나타내는 스테이트
  const [currentLocation, setCurrentLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [activity, setActivity] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showActivityShort, setShowActivityShort] = useState(false);
  const [showActivityDetail, setShowActivityDetail] = useState(false);

  // 현재위치 api호출
  useEffect(() => {
    // 현재위치 찍기
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({ lat: latitude, lng: longitude });
    });
  }, []);

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

  const onViewActivityDetail = () => {
    setShowActivityDetail(true);
  };

  const onCloseActivityDetail = () => {
    setShowActivityDetail(false);
  };

  return (
    <div>
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
        {showActivityDetail ? (
          <div>
            {currentLocation && (
              <Marker
                center={currentLocation}
                position={currentLocation}
                zoom={10}
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
                      left: -53,
                      padding: "5px 10px",
                      width: "200px",
                      fontSize: "8px",
                      fontWeight: `600`,
                      color: "#222222",
                    }}
                  >
                    {activeList.title}
                  </div>
                </OverlayView>
                {activeMarker === activeList.id && (
                  <ActivityDetail
                    onCloseActivityDetail={onCloseActivityDetail}
                    unViewActivityShort={showActivityShort}
                    activeList={activeList}
                  />
                )}
              </Marker>
            ))}
          </div>
        ) : (
          <div>
            <div className="box-activity-input">
              <Autocomplete
                apiKey={process.env.REACT_APP_MAP_API}
                placeholder="챌린지 장소, 주소 검색"
              ></Autocomplete>
            </div>
            <div>
              {currentLocation && (
                <Marker
                  center={currentLocation}
                  position={currentLocation}
                  zoom={10}
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
                        left: -53,
                        padding: "5px 10px",
                        width: "200px",
                        fontSize: "8px",
                        fontWeight: `600`,
                        color: "#222222",
                      }}
                    >
                      {activeList.title}
                    </div>
                  </OverlayView>
                  {activeMarker === activeList.id && (
                    <ActivityShort
                      onViewActivityDetail={onViewActivityDetail}
                      activeList={activeList}
                    />
                  )}
                </Marker>
              ))}
            </div>
          </div>
        )}
      </GoogleMap>
    </div>
  );
};

export default ActivityPage;
