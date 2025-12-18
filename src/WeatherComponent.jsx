import React, { useEffect, useState } from "react";
import useCurrentLocation from "./useCurrentLocation";

function WeatherComponent() {
  const { latitude, longitude } = useCurrentLocation(); // 位置情報取得
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // 緯度経度が null でない場合のみ取得
    if (latitude && longitude) {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTPエラー: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => {
          console.error("天気データ取得エラー:", error);
        });
    }
  }, [latitude, longitude]); // 緯度経度が更新された時に再フェッチ

  return (
    <div>
      <h1>現在地の天気</h1>
      <p>緯度: {latitude}</p>
      <p>経度: {longitude}</p>

      {weatherData ? (
        <div>
          <p>気温: {weatherData.current_weather.temperature}℃</p>
          <p>風速: {weatherData.current_weather.windspeed} m/s</p>
          <p>時刻: {weatherData.current_weather.time}</p>
        </div>
      ) : (
        <p>データ取得中...</p>
      )}
    </div>
  );
}

export default WeatherComponent;
