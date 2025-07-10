import React, { useEffect, useRef, useState } from "react";
import ellipse12 from "../assets/eventsection/Ellipse 12.png";

const EventWheel = ({ events, currentIndex, setCurrentIndex }) => {
  const radius = 200;
  const centerX = 200;
  const centerY = 200;
  const angleStep = 340 / (events.length);

  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();

      const scrollSpeed = 0.4;
      const maxDelta = angleStep * 0.5;

      let delta = -Math.sign(e.deltaY) * Math.log(Math.abs(e.deltaY) + 1) * scrollSpeed;
      delta = Math.max(-maxDelta, Math.min(maxDelta, delta));

      let nextAngle = rotationRef.current + delta;

      const maxAngle = (events.length - 1) * angleStep;
      nextAngle = Math.max(-maxAngle, Math.min(0, nextAngle));

      rotationRef.current = nextAngle;
      setRotation(nextAngle);

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        const estimatedIndex = Math.round(-rotationRef.current / angleStep);
        const clampedIndex = Math.max(0, Math.min(events.length - 1, estimatedIndex));

        const targetRotation = -clampedIndex * angleStep;
        rotationRef.current = targetRotation;
        setRotation(targetRotation);
        setCurrentIndex(clampedIndex);
      }, 200);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [angleStep, events.length, setCurrentIndex]);


  return (
    <div className="">
      <div className="hidden" style={{ position: "absolute", top: 10, left: 10, color: "yellow", fontSize: "14px" }}>
        rot: {rotation.toFixed(1)}°, index: {currentIndex}
      </div>

      <img
        src={ellipse12} // pass your PNG path here
        alt="orbit path"
        className="orbit-arc"
        style={{ width: '380px', height: '480px', position: 'absolute', top:220 , left:-140 }}
      />

      <div
        className="wheel"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: "transform 0.25s ease-out",
          position: "absolute",
          top: 260,
          left: -150
        }}
      >
        {events.map((event, index) => {
          const angle = index * angleStep;
          const rad = (angle * Math.PI) / 180;
          const x = radius * Math.cos(rad);
          const y = radius * Math.sin(rad);

          return (
            <div
              key={index}
              className={`wheel-item ${index === currentIndex ? "active" : ""}`}
              style={{
                left: `${centerX + x}px`,
                top: `${centerY + y}px`,
                transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
              }}
            >
              <span>{event.short}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventWheel;
