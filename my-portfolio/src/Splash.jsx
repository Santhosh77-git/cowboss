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
          setTimeout(() => onFinish(), 800);
        }, 600);
      }
    }, 60); // delay between each letter
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`splash-wrapper ${exit ? "exit" : ""}`}>
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
