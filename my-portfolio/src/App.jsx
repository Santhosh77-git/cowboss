import React, { useState, useRef, useEffect } from "react";
import "./index.css";

const initialLeft = {
  id: "hero",
  titleLines: ["Glad, I' m Santhosh", "Got two minutes to stalk my portfolio? Go on… click here"],
  showButton: true,
};

const contentByTab = {
  about: {
    id: "about",
    titleLines: [
      `I’m Santhosh, an engineering student who loves turning ideas into working systems that solve real problems.`,
      `I enjoy experimenting with both software and hardware, especially projects involving automation, AI, and smart technologies.`,
      `I’m currently seeking an internship where I can learn from real-world challenges, contribute to meaningful work, and grow as an engineer.`,
      `I believe in staying curious, asking questions, and improving a little every day. Beyond academics, I’m someone who enjoys building, exploring, and understanding how things work at the core.`,
    ],
    showButton: false,
  },
  skills: {
    id: "skills",
    titleLines: [
      "Skills",
      "Embedded systems · Python · C/C++ · React · FastAPI · PostgreSQL · WebAssembly · three.js · ML basics",
    ],
    showButton: false,
  },
  testimonials: {
    id: "testimonials",
    titleLines: [
      "Testimonials",
      "“Quick learner and reliable” — Mentor",
      "“Great at prototyping hardware+software” — Lab instructor",
    ],
    showButton: false,
  },
  certificates: {
    id: "certificates",
    titleLines: [
      "Certificates",
      "Digital Systems  — Completed",
      "AI Fundamentals — Completed",
    ],
    showButton: false,
  },
  contact: {
    id: "contact",
    titleLines: [
      "Contact Me",
      "Email: santhoshmuruganandham023@gmail.com",
      "Open to internship opportunities — let's talk.",
    ],
    showButton: false,
  },
};

export default function App() {
  const [leftContent, setLeftContent] = useState(initialLeft);
  const [animState, setAnimState] = useState("idle"); // idle | out | in
  const [activeTab, setActiveTab] = useState(null); // null or "about"/"skills"...
  const [navVisible, setNavVisible] = useState(false);
  const photoRef = useRef(null);

  // Trigger transition from current left content to new content (tabKey).
  const replaceLeftContent = (tabKey) => {
    const newContent = contentByTab[tabKey];
    if (!newContent) return;
    // start slide-out
    setAnimState("out");
    // after out animation, swap and animate in
    setTimeout(() => {
      setLeftContent(newContent);
      setAnimState("in");
      setActiveTab(tabKey);
      // finish animation
      setTimeout(() => setAnimState("idle"), 450);
    }, 350); // match css durations
  };

  const onHeckYes = () => {
    // When user clicks Heck Yes: show navbar, replace left content with About
    setNavVisible(true);
    replaceLeftContent("about");
  };

  // Nav click handler
  const onNavClick = (key) => {
    if (key === activeTab) return;
    replaceLeftContent(key);
  };

  // Pulse photo briefly when activeTab changes (i.e. user navigates to another section)
  useEffect(() => {
    const img = photoRef.current;
    if (!img) return;
    // don't pulse for null -> null transitions
    if (!activeTab) return;
    img.classList.add("pulse-on");
    const t = setTimeout(() => img.classList.remove("pulse-on"), 700);
    return () => clearTimeout(t);
  }, [activeTab]);

  // helper to render left text lines
  const LeftText = ({ lines }) => (
    <div className="left-lines" aria-live="polite">
      {lines.map((ln, idx) => (
        <p key={idx} className="left-line">
          {ln}
        </p>
      ))}
    </div>
  );

  return (
    <div className="app-root">
      {/* NAVBAR: full-width at top, appears when navVisible */}
      <header className={`top-nav ${navVisible ? "nav-show" : ""}`} role="navigation" aria-label="Main">
        <div className="nav-inner">
          <div className="nav-left" aria-hidden="true">Santhosh <span className="nav-sep">|</span> 9087847806</div>
          <button
            className={`nav-btn ${activeTab === "about" ? "active" : ""}`}
            onClick={() => onNavClick("about")}
          >
            About
          </button>
          <button
            className={`nav-btn ${activeTab === "skills" ? "active" : ""}`}
            onClick={() => onNavClick("skills")}
          >
            Skills
          </button>
          <button
            className={`nav-btn ${activeTab === "testimonials" ? "active" : ""}`}
            onClick={() => onNavClick("testimonials")}
          >
            Testimonials
          </button>
          <button
            className={`nav-btn ${activeTab === "certificates" ? "active" : ""}`}
            onClick={() => onNavClick("certificates")}
          >
            Certificates
          </button>
          <button
            className={`nav-btn ${activeTab === "contact" ? "active" : ""}`}
            onClick={() => onNavClick("contact")}
          >
            Contact Me
          </button>
        </div>
      </header>

      {/* MAIN VIEWPORT */}
      <main className="viewport">
        {/* Right-fixed photo (never moves) */}
        <aside className="fixed-photo" aria-hidden="true">
          <img ref={photoRef} src="/me.jpg" alt="Santhosh" />
        </aside>

        {/* Left content box — exact same position, swapped via animations */}
        <section className="left-area" aria-live="polite">
          {/* incoming/outgoing wrapper */}
          <div className={`left-wrapper ${animState === "out" ? "slide-out" : ""} ${animState === "in" ? "slide-in" : ""}`}>
            {/* Title lines */}
            <LeftText lines={leftContent.titleLines} />

            {/* Optional button for hero */}
            {leftContent.showButton && (
              <button className="heck-btn" onClick={onHeckYes}>
                Heck Yes!
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
