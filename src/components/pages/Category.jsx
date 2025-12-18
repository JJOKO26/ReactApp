import React from "react";
import { useNavigate } from "react-router-dom";
import "./Category.css";
import Footer from "../Footer";

export default function Category() {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "お肉" },
    { id: 2, name: "魚介" },
    { id: 3, name: "野菜" },
    { id: 4, name: "スープ" },
    { id: 5, name: "麺" },
    { id: 6, name: "丼" },
    { id: 7, name: "パン" },
    { id: 8, name: "お菓子" },
  ];

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
    <div className="category-container">
      <h1>カテゴリ検索</h1>
      <div className="category-grid">
        {categories.map((category) => (
          <button
            key={category.id}
            className="category-button"
            onClick={() =>
              navigate(`/list?category=${encodeURIComponent(category.name)}`)
            }
          >
            {category.name}
          </button>
        ))}
      </div>
      <Footer buttons={footerButtons} />
    </div>
  );
}
