import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import SearchCardList from "../Search_CardList";
import "./Search.css";
import recipes from "../../assets/data/Recipes";

export default function Search() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (keyword.trim() === "") return;
    navigate(`/list?keyword=${encodeURIComponent(keyword)}`);
  };

  const footerButtons = [
    { label: "カテゴリ検索", onClick: () => navigate("/Category") },
    { label: "ホーム", onClick: () => navigate("/") },
  ];

  return (
    <div className="search-container">
      <h1>レシピブックアプリ</h1>
      <div className="search-row">
        <input
          type="text"
          placeholder="キーワードを入力"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          検索
        </button>
      </div>
      <hr />
      <SearchCardList recipes={recipes} />
      <Footer buttons={footerButtons} />
    </div>
  );
}
