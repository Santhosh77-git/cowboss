import { useState, useEffect } from "react";
import "./Splash.css";

export default function Splash({ onFinish }) {
  const text = `Welcome To The Town of "PORTFOLIO"`;
  const letters = text.split("");

  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setVisibleIndex(i);
      i++;
      if (i === letters.length) {
        clearInterval(timer);
        setTimeout(() => {
          setExit(true);
          setTimeout(() => onFinish(), 900);
        }, 650);
      }
    }, 80); // delay between each letter
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`splash-wrapper ${exit ? "exit" : ""}`}>
      <video
      autoPlay
      loop
      muted
      playsInline
      className="bg-video"
    >
      <source src={import.meta.env.BASE_URL + "bg-video.mp4"} type="video/mp4" />

    </video>
      {letters.map((ch, idx) => (
        <span
          key={idx}
          className={`letter ${idx <= visibleIndex ? "show" : ""}`}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </div>
  );
}
