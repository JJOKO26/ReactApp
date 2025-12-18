import React from "react";
import "./FooterButton.css";

export default function FooterButton({ label, onClick }) {
  return (
    <button className="footer-button" onClick={onClick}>
      {label}
    </button>
  );
}
