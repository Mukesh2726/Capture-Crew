 import React, { useState } from "react";
import "./Booking.css";

function Booking() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [reelsCount, setReelsCount] = useState(0);
  const [photosCount, setPhotosCount] = useState(0);

  const plans = [
    { id: 1, name: "Hourly Basic", price: "₹699/hr" },
    { id: 2, name: "Hourly Premium", price: "₹999/hr" },
    { id: 3, name: "Full Day Event", price: "₹5,999/day" },
    { id: 4, name: "Corporate Shoot", price: "₹7,999" },
    { id: 5, name: "Festival Shoot", price: "₹6,499" },
    { id: 6, name: "Small Event Shoot", price: "₹3,999" },
    { id: 7, name: "Business / Product Shoot", price: "₹4,999" },
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setReelsCount(0);
    setPhotosCount(0);
  };

  const handleBooking = () => {
    if (!selectedPlan) {
      alert("Please select a plan before booking!");
      return;
    }
    alert(`Booking confirmed for ${selectedPlan.name}!`);
    setSelectedPlan(null);
    setReelsCount(0);
    setPhotosCount(0);
  };

  return (
    <div className="booking-page">
      <h2>📸 Choose Your Plan</h2>

      <div className="booking-container">
        <div className="plan-list">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${
                selectedPlan?.id === plan.id ? "selected" : ""
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              <h3>{plan.name}</h3>
              <p>{plan.price}</p>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="cart-box">
            <h3>Selected Plan</h3>
            <p>
              <strong>{selectedPlan.name}</strong> – {selectedPlan.price}
            </p>

            <div className="addon-list">
              <div className="addon-item">
                <span>Extra Reels:</span>
                <div style={{ float: "right" }}>
                  <button
                    className="btn"
                    onClick={() => setReelsCount(reelsCount + 1)}
                  >
                    +
                  </button>
                  <span style={{ margin: "0 8px" }}>{reelsCount}</span>
                </div>
              </div>

              <div className="addon-item">
                <span>Extra Photos:</span>
                <div style={{ float: "right" }}>
                  <button
                    className="btn"
                    onClick={() => setPhotosCount(photosCount + 1)}
                  >
                    +
                  </button>
                  <span style={{ margin: "0 8px" }}>{photosCount}</span>
                </div>
              </div>
            </div>

            <button className="book-btn" onClick={handleBooking}>
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;
