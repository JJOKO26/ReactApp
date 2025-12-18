import React from "react";
import "./Footer.css";
import FooterButton from "./FooterButton";

export default function Footer({ buttons }) {
  return (
    <footer className="footer">
      {buttons.map((btn, index) => (
        <FooterButton key={index} label={btn.label} onClick={btn.onClick} />
      ))}
    </footer>
  );
}
