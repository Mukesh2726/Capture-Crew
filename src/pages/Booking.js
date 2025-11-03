import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Booking() {
  const plans = [
    { id: 1, name: "Hourly Basic", desc: "1–2 hrs, minimal edits", price: 999 },
    { id: 2, name: "Hourly Premium", desc: "1–2 hrs, cinematic edits", price: 1499 },
    { id: 3, name: "Full Day Coverage", desc: "Up to 8 hrs, multiple locations", price: 4999 },
    { id: 4, name: "Business / Corporate Shoot", desc: "Office, branding, or product coverage", price: 6999 },
    { id: 5, name: "Festival & Cultural Events", desc: "Festivals, college or public functions", price: 3999 },
    { id: 6, name: "Small Events", desc: "Birthdays, home functions, family shoots", price: 2499 },
  ];

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [reelsCount, setReelsCount] = useState(0);
  const [photosCount, setPhotosCount] = useState(0);
  const REEL_PRICE = 349;
  const PHOTO_PRICE = 199;
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    date: "",
    time: "",
    location: "",
  });
  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setReelsCount(0);
    setPhotosCount(0);
  };

  const handleBookNow = () => {
    if (!selectedPlan) {
      alert("Please select a plan first!");
      return;
    }
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmBooking = () => {
    const { name, email, number, date, time, location } = formData;
    if (!name || !email || !number || !date || !time || !location) {
      alert("Please fill all fields!");
      return;
    }
    setShowForm(false);
    setShowConfirm(true);
    // persist recent booking so Home can show status
    try {
      const ts = new Date().toISOString();
      const bookingId = `bk_${Date.now()}`;
      const liveLink = `https://example.com/track/${bookingId}`;
      const recent = {
        bookingId,
        liveLink,
        plan: selectedPlan,
        name,
        email,
        number,
        date,
        time,
        location,
        reels: reelsCount,
        photos: photosCount,
        total: selectedPlan.price + reelsCount * REEL_PRICE + photosCount * PHOTO_PRICE,
        ts,
      };
      localStorage.setItem("recentBooking", JSON.stringify(recent));
    } catch (e) {
      console.warn("Could not save recent booking", e);
    }
  };

  return (
    <div className="booking-page">
      <h2 className="fade-in visible">📸 Choose Your Perfect Shoot Plan</h2>

      <div className="booking-container fade-in visible">
        <div className="plan-list">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${
                selectedPlan?.id === plan.id ? "selected" : ""
              }`}
              onClick={() => handleSelectPlan(plan)}
            >
              <h3>{plan.name}</h3>
              <p>{plan.desc}</p>
              <p className="price-tag">₹{plan.price}</p>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="cart-box fade-in visible">
            <h3>Selected Plan</h3>
            <p>
              <strong>{selectedPlan.name}</strong> — ₹{selectedPlan.price}
            </p>

              <div style={{marginTop:8}}>
                <p style={{margin:4}}><strong>Add-ons</strong></p>
                <p style={{margin:2}}>🎬 Reels: {reelsCount} × ₹{REEL_PRICE} = ₹{reelsCount * REEL_PRICE}</p>
                <p style={{margin:2}}>📸 Photos: {photosCount} × ₹{PHOTO_PRICE} = ₹{photosCount * PHOTO_PRICE}</p>
                <p style={{marginTop:6, fontWeight:700}}>Total: ₹{selectedPlan.price + reelsCount * REEL_PRICE + photosCount * PHOTO_PRICE}</p>
              </div>

            <div className="addon-list">
              <div className="addon-item">
                <span>🎬 Reels: {reelsCount}</span>
                <button
                  className="btn"
                  onClick={() => setReelsCount(reelsCount + 1)}
                >
                  ➕ Add Reel
                </button>
              </div>

              <div className="addon-item">
                <span>📸 Photos: {photosCount}</span>
                <button
                  className="btn"
                  onClick={() => setPhotosCount(photosCount + 1)}
                >
                  ➕ Add Photo
                </button>
              </div>
            </div>

            <button className="book-btn" onClick={handleBookNow}>
              Book Now
            </button>
          </div>
        )}
      </div>

      {/* Booking Details Form Popup */}
      {showForm && (
        <div className="popup fade-in visible">
          <div className="popup-content">
            <button className="popup-close" aria-label="Close" onClick={() => setShowForm(false)}>×</button>
            <h3>Enter Booking Details</h3>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="tel" name="number" placeholder="Mobile Number" value={formData.number} onChange={handleChange} />
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
            <input type="time" name="time" value={formData.time} onChange={handleChange} />
            <input type="text" name="location" placeholder="Event Location" value={formData.location} onChange={handleChange} />

            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button className="confirm-btn" onClick={handleConfirmBooking}>Confirm Booking</button>
              <button className="close-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Confirmation Popup */}
      {showConfirm && (
        <div className="popup fade-in visible">
          <div className="popup-content confirm">
            <button className="popup-close" aria-label="Close" onClick={() => { setShowConfirm(false); navigate('/'); }}>×</button>
            <h3>✅ Booking Confirmed!</h3>
            <p><strong>Plan:</strong> {selectedPlan?.name} — ₹{selectedPlan?.price}</p>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Location:</strong> {formData.location}</p>
            <p><strong>Date:</strong> {formData.date} at {formData.time}</p>
            <p><strong>Total:</strong> ₹{selectedPlan?.price + reelsCount * REEL_PRICE + photosCount * PHOTO_PRICE}</p>

            <div className="shooter-info">
              <h4>📸 Shooter Assigned:</h4>
              <p><strong>Name:</strong> Rohit Kumar</p>
              <p><strong>Contact:</strong> +91 98765 43210</p>
              {/* Provide a single prominent live-tracking link instead of an image/map placeholder */}
              <p className="tracking-text">Live tracking: <a className="live-link" href="https://example.com/live-tracking" target="_blank" rel="noopener noreferrer">Open Live Tracking</a></p>
            </div>

            <button className="close-btn" onClick={() => { setShowConfirm(false); navigate('/'); }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
