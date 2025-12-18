import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import recipes from "../../assets/data/Recipes";
import ListCardList from "../List_CardList";
import Footer from "../Footer";
import "./List.css";

export default function List() {
  const navigate = useNavigate();
  const { search } = useLocation();

  // URLクエリからパラメータを取る
  const params = new URLSearchParams(search);
  const keyword = params.get("keyword")?.toLowerCase() || "";
  const category = params.get("category") || "";

  // フィルタ処理
  let results = recipes;

  if (keyword) {
    results = results.filter((recipe) =>
      recipe.title.toLowerCase().includes(keyword)
    );
  }

  if (category) {
    results = results.filter((recipe) => recipe.category === category);
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
    <div className="list-container">
      <h1>レシピ一覧</h1>
      <ListCardList recipes={results} />
      <Footer buttons={footerButtons} />
    </div>
  );
}
