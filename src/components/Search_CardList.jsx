import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCurrentLocation from "../useCurrentLocation"; // 位置情報フック
import recipesData from "../assets/data/Recipes"; // あなたのレシピ配列
import temperatureRecipeGroups from "./temperatureRecipeGroups"; // グループ設定
import "./CardList.css";

// 配列シャッフル→指定数取得
function pickRandom(array, n) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default function WeatherRecipeCardList() {
  const { latitude, longitude } = useCurrentLocation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (latitude && longitude) {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const temp = data.current_weather.temperature; // ℃

          let groupKey;
          if (temp < 10) {
            groupKey = "hot_meal";
          } else if (temp < 20) {
            groupKey = "standard_meal";
          } else {
            groupKey = "cold_meal";
          }

          const { titles } = temperatureRecipeGroups[groupKey];

          const filtered = recipesData.filter(
            (r) => r.title && titles.includes(r.title)
          );

          // 🔹 ID重複を除去
          const uniqueFiltered = Array.from(
            new Map(filtered.map((item) => [item.id, item])).values()
          );

          // ランダムで最大2件取得
          const selected = pickRandom(uniqueFiltered, 2);
          setRecipes(selected);
        })
        .catch((error) => {
          console.error("天気データ取得エラー:", error);
        });
    }
  }, [latitude, longitude]);

  const handleClick = (id) => {
    navigate(`/Detail/${id}`);
  };

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
