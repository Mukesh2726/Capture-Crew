 import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import "./App.css";

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav
        style={{
          backgroundColor: "#4B0082",
          color: "white",
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Capture Crew 📸</h1>
        <div>
          <Link
            to="/"
            style={{
              marginRight: "20px",
              color: "white",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          <Link
            to="/booking"
            style={{ color: "white", textDecoration: "none" }}
          >
            Book Now
          </Link>
        </div>
      </nav>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </Router>
  );
}

export default App;
