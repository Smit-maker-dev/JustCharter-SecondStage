import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import notFoundAnimation from "../Animation/404 Error - Doodle animation.json";

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        // backgroundColor: "#f8fafc",
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          marginBottom: "1.5rem",
        }}
      >
        <Lottie
          animationData={notFoundAnimation}
          loop={true}
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <p
        style={{
          fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
          marginBottom: "2rem",
          color: "#475569",
          maxWidth: "90%",
          lineHeight: "1.6",
        }}
      >
        <strong style={{ color: "#ef4444" }}>404 - Not Found!</strong>
        <br />
        The page you're looking for doesn’t exist.
        <br />
        Let’s go back to the <em>Home</em>.
      </p>

      <Link
        to="/"
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#2563eb",
          color: "#fff",
          borderRadius: "0.5rem",
          textDecoration: "none",
          fontSize: "clamp(0.9rem, 2vw, 1rem)",
          fontWeight: "500",
          transition: "background-color 0.2s ease-in-out",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
      >
        Go Back To Home
      </Link>
    </div>
  );
}
