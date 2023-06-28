import React from "react";
import { useState, useEffect } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { Wrapper } from "@googlemaps/react-wrapper";
import Autocomplete from "react-google-autocomplete";

const placesLibrary = ["places"];

const ActivityPage = () => {
  // 현재위치 나타내는 스테이트
  const [currentLocation, setCurrentLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);

  // 현재위치api호출
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

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = async (map) => {
    const bounds = await new window.google.maps.LatLngBounds();
    markers.forEach(({ lat, lon }) =>
      bounds.extend(new window.google.maps.LatLng(lat, lon))
    );
    map.fitBounds(bounds);
    setMap(map);
  };

  return isLoaded ? (
    <Wrapper
      apiKey={process.env.REACT_APP_MAP_API}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <GoogleMap
        onLoad={handleOnLoad}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        zoom={20}
      >
        <div
          style={{
            marginTop: "92px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Autocomplete
            apiKey={process.env.REACT_APP_MAP_API}
            placeholder="챌린지 장소, 주소 검색"
            fontSize="16pt"
            color="#AAAAAA"
            marginLefg="20px"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              placeholder: `search`,
              backgroundColor: `#FFFFFF`,
              placeContent: `Search`,
              width: `549px`,
              height: `59px`,
              padding: `0 12px`,
              borderRadius: `10pt`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              zIndex: "1",
            }}
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
      </GoogleMap>
    </Wrapper>
  ) : null;
};

export default ActivityPage;
