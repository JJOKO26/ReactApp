import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardList.css";

export default function ListCardList({ recipes }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/Detail/${id}`); // id付きで遷移させる例
  };

  return (
    <div className="card-list">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
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
