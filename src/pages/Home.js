import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const [recentBooking, setRecentBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("recentBooking");
      if (raw) setRecentBooking(JSON.parse(raw));
    } catch (e) {
      console.warn("Failed to read recent booking", e);
    }
  }, []);

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero fade-in">
        <h1>Capture Crew 📸</h1>
        <p>
          Book professional photographers and videographers for your next event — 
          from small functions to cinematic reels. 
          Fast, reliable, and beautifully crafted memories.
        </p>
        <Link to="/booking">
          <button className="btn">Book Now</button>
        </Link>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works fade-in" id="how">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="icon">🎬</div>
            <h3>Choose a Plan</h3>
            <p>Select from Reels, Photoshoots, Events, Drone Shots & more.</p>
          </div>
          <div className="step">
            <div className="icon">🧾</div>
            <h3>Customize Add-ons</h3>
            <p>Add extra hours, drone footage, or express delivery options.</p>
          </div>
          <div className="step">
            <div className="icon">🚀</div>
            <h3>Confirm Booking</h3>
            <p>Instant confirmation and professional crew assigned quickly.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about fade-in" id="about">
        <h2>About Us</h2>
        <div className="about-content">
          <p>
            Capture Crew connects you with talented photographers and videographers 
            who bring your moments to life. Whether it’s a personal shoot, event, 
            or business promotion, our team ensures quality and speed.
          </p>
          <p>
            With on-demand booking, real-time updates, and fast delivery, 
            Capture Crew is redefining creative event coverage.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects fade-in" id="projects">
        <h2>Our Recent Work</h2>
        <div className="project-gallery">
          <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e" alt="Shoot 1" />
          <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9" alt="Shoot 2" />
          <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2" alt="Shoot 3" />
          <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4" alt="Shoot 4" />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Capture Crew. All rights reserved.
      </footer>
      {/* Recent booking floating widget */}
      {recentBooking && (
        <div className="recent-booking-widget">
          <div style={{ flex: 1 }}>
            <strong>Recent Booking</strong>
            <div className="rb-line"><strong>Plan:</strong> {recentBooking.plan?.name} — ₹{recentBooking.plan?.price}</div>
            <div className="rb-line"><strong>Name:</strong> {recentBooking.name}</div>
            <div className="rb-line"><strong>When:</strong> {recentBooking.date} at {recentBooking.time}</div>
            <div className="rb-line"><strong>Where:</strong> {recentBooking.location}</div>
            <div className="rb-line"><strong>Booking ID:</strong> {recentBooking.bookingId}</div>
            <div className="rb-line"><strong>Total:</strong> ₹{recentBooking.total}</div>
          </div>
          <div className="rb-actions">
            <a className="live-link" href={recentBooking.liveLink} target="_blank" rel="noopener noreferrer">Open Live Tracking</a>
            <button className="btn" onClick={() => { localStorage.removeItem('recentBooking'); setRecentBooking(null); }}>Dismiss</button>
          </div>
        </div>
      )}
    </div>
  );
}
