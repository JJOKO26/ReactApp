import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCurrentLocation from "../useCurrentLocation";
import recipesData from "../assets/data/Recipes";
import temperatureRecipeGroups from "./temperatureRecipeGroups";
import "./CardList.css";

function pickRandom(array, n) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default function WeatherRecipeCardList() {
  const { latitude, longitude } = useCurrentLocation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (!latitude || !longitude) return;

    const controller = new AbortController();
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;

    (async () => {
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const temp = data?.current_weather?.temperature;

        let groupKey;
        if (typeof temp !== "number") {
          // 温度取れない場合は標準メニューへ
          groupKey = "standard_meal";
        } else if (temp < 10) {
          groupKey = "hot_meal";
        } else if (temp < 20) {
          groupKey = "standard_meal";
        } else {
          groupKey = "cold_meal";
        }

        const { titles } = temperatureRecipeGroups[groupKey] ?? { titles: [] };
        const filtered = recipesData.filter(
          (r) => r.title && titles.includes(r.title)
        );

        const uniqueFiltered = Array.from(
          new Map(filtered.map((item) => [item.id, item])).values()
        );
        const selected = pickRandom(uniqueFiltered, 2);
        setRecipes(selected);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("天気データ取得エラー:", error);
          // フォールバック：標準メニューから選定
          const { titles } = temperatureRecipeGroups["standard_meal"] ?? {
            titles: [],
          };
          const filtered = recipesData.filter(
            (r) => r.title && titles.includes(r.title)
          );
          const uniqueFiltered = Array.from(
            new Map(filtered.map((item) => [item.id, item])).values()
          );
          setRecipes(pickRandom(uniqueFiltered, 2));
        }
      }
    })();

    // ★ 新しい位置が来たら前回フェッチを中止
    return () => controller.abort();
  }, [latitude, longitude]);

  const handleClick = (id) => navigate(`/Detail/${id}`);

  return (
    <div className="card-list">
      {recipes.map((recipe, index) => (
        <div
          key={recipe.id ?? index}
          className="card"
          onClick={() => handleClick(recipe.id)}
        >
          <img src={recipe.image} alt={recipe.title} />
          <h3>{recipe.title}</h3>
        </div>
      ))}
    </div>
  );
}
