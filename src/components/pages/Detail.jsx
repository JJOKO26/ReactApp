import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import recipes from "../../assets/data/Recipes";
import "./Detail.css";
import Footer from "../Footer";

export default function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const recipeId = parseInt(id, 10);
  const recipe = recipes.find((r) => r.id === recipeId);

  if (!recipe) {
    return <p className="not-found">No Data</p>;
  }

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const footerButtons = [
    { label: "戻る", onClick: handleGoBack },
    { label: "ホーム", onClick: () => navigate("/") },
  ];

  return (
    <div className="recipe-detail">
      <h1 className="recipe-title">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <p className="recipe-time">調理時間: {recipe.cookingTime}</p>
      <h2>材料</h2>
      <ul className="recipe-ingredients">
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h2>手順</h2>
      <ol className="recipe-steps">
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <Footer buttons={footerButtons} />
    </div>
  );
}
