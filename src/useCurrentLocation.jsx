import { useState, useEffect } from "react";

function useCurrentLocation() {
  // localStorageから初期値を読み込み（数値 or null）
  const [location, setLocation] = useState(() => {
    const savedLat = localStorage.getItem("latitude");
    const savedLon = localStorage.getItem("longitude");
    return {
      latitude: savedLat ? parseFloat(savedLat) : null,
      longitude: savedLon ? parseFloat(savedLon) : null,
    };
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setLocation(newLocation);

        // localStorageに保存
        localStorage.setItem("latitude", newLocation.latitude);
        localStorage.setItem("longitude", newLocation.longitude);
      },
      (error) => {
        console.error("Error obtaining location: ", error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return location;
}

export default useCurrentLocation;
