import React from "react";

const EventDetails = ({ event }) => {
  if (!event) return null;

  return (
    <div className="info-panel">
      <h2>Our Events</h2>

      <div className="event-card">
        <h3>{event.name}</h3>
        <p>{event.description}</p>
      </div>

      <div className="event-metrics">
        <h3>Highlights</h3>

        <div className="metrics-box">
          {event.metrics?.map((stat, idx) => (
            <div key={idx} className="metric">
              <div className="metric-value">{stat.value}</div>
              <div className="metric-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="buttons">
          <button className="btn">Event Details</button>
          <button className="btn register">Register Now</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
