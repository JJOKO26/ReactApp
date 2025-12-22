import { useState, useEffect } from "react";

function roundCoord(value, decimals = 2) {
  const f = Math.pow(10, decimals);
  return Math.round(value * f) / f;
}

function useCurrentLocation() {
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
      alert("お使いのブラウザは位置情報に対応していません");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          latitude: roundCoord(position.coords.latitude, 2), // ★丸め
          longitude: roundCoord(position.coords.longitude, 2), // ★丸め
        };
        setLocation(newLocation);
        localStorage.setItem("latitude", String(newLocation.latitude));
        localStorage.setItem("longitude", String(newLocation.longitude));
      },
      (error) => {
        console.error("位置情報エラー: ", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 60_000, // 既存位置を最大1分再利用
      }
    );

    // ★ 監視停止（クリーンアップ）
    return () => {
      try {
        navigator.geolocation.clearWatch(watchId);
      } catch (e) {
        console.error("clearWatch 中に例外が発生:", e);
      }
    };
  }, []);

  return location;
}

export default useCurrentLocation;
