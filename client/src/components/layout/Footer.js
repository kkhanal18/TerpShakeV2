import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        borderTop: "1px solid #e0e0e0",
        backgroundColor: "#fff",
        fontSize: "0.9rem",
        color: "#555"
      }}
    >
      <span style={{ fontWeight: "bold", color: "#333" }}>TerpShake</span>
      <span>&copy; 2026</span>
    </footer>
  );
};

export default Footer;
