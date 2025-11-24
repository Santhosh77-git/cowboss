import React, { useState, useRef, useEffect } from "react";
<<<<<<< HEAD
import "./index.css";

const initialLeft = {
  id: "hero",
  titleLines: ["Glad, I' m Santhosh", "Got two minutes to stalk my portfolio? Go on… click here"],
  showButton: true,
};

const contentByTab = {
=======
import "./App.css";

/* ---------- HERO ---------- */
const initialLeft = {
  id: "hero",
  titleLines: [
    "Glad, I' m Santhosh || Domain Explorer",
    "Got two minutes to stalk my portfolio? Go on… click here",
  ],
  showButton: true,
};

/* ---------- CONTENT BY TABS ---------- */
const contentByTab = {
  story: {
    id: "story",
    titleLines: [
      "Before entering into the Town, I'm my Boss's Buddy and I'm here to represent my Boss's profession.",
      "If you've any query, say it to me and I will reach out that to my Boss.",
      "",
      "We've some constraints to visit our Town. They are:",
      "• Don't reveal the secret of our Town.",
      "• We will provide a Horse for your ride.",
      "• After my bullet sound, you can move to the next Area.",
      "• Finally, if you trust our Boss, you can call our Boss with his contact and I will provide it."
    ],
    showButton: false,
  },
  hero: initialLeft,
>>>>>>> db7ef00 (first commit)
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

<<<<<<< HEAD
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
=======
/* ---------- ORDER WITH NEW STORY SCREEN ---------- */
const tabOrder = ["story", "hero", "about", "skills", "testimonials", "certificates", "contact"];

export default function App() {
  const [leftContent, setLeftContent] = useState(contentByTab.story);
  const [animState, setAnimState] = useState("idle");
  const [activeTab, setActiveTab] = useState("story");
  const [navVisible, setNavVisible] = useState(false);
  const [photoInNav, setPhotoInNav] = useState(false);
  const photoRef = useRef(null);

  const [isWelcome, setIsWelcome] = useState(true);
  const [welcomeAnim, setWelcomeAnim] = useState("");

  const [gunState, setGunState] = useState({ show: false, side: "left", firing: false });
  const gunTimeoutRef = useRef(null);

  const clickAudio = useRef(new Audio("/sounds/click.mp3")).current;
  const gunAudio = useRef(new Audio("/sounds/gunshot.mp3")).current;

  /* ---------- ENTER TOWN → STORY ---------- */
  const enterTown = () => {
    setWelcomeAnim("fadeOut");
    setTimeout(() => {
      setIsWelcome(false);
      setLeftContent(contentByTab.story);
      setActiveTab("story");
    }, 1000);
  };

  /* ---------- CONTENT TRANSITION ---------- */
  const replaceLeftContent = (tabKey) => {
    const newContent = contentByTab[tabKey];
    if (!newContent) return;
    setAnimState("out");
>>>>>>> db7ef00 (first commit)
    setTimeout(() => {
      setLeftContent(newContent);
      setAnimState("in");
      setActiveTab(tabKey);
<<<<<<< HEAD
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
    const iframe = document.getElementById("heygen-video");
  const btn = document.getElementById("mute-toggle");
  let muted = true;

  btn.addEventListener("click", () => {
    mutated = !muted;
    iframe.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: muted ? "unmute" : "mute" }),
      "*"
    );
    btn.textContent = muted ? "🔊" : "🔇";
  });
  }, [activeTab]);

  // helper to render left text lines
  const LeftText = ({ lines }) => (
    <div className="left-lines" aria-live="polite">
      {lines.map((ln, idx) => (
        <p key={idx} className="left-line">
          {ln}
        </p>
      ))}
=======
      setTimeout(() => setAnimState("idle"), 450);
    }, 350);
  };

  /* ---------- GUN-STYLE NAVIGATION ---------- */
  const triggerNavigationWithGun = (tabKey) => {
    const prevIndex = tabOrder.indexOf(activeTab);
    const newIndex = tabOrder.indexOf(tabKey);
    let side = newIndex > prevIndex ? "left" : "right";

    setGunState({ show: true, side, firing: true });
    try { gunAudio.currentTime = 0; gunAudio.play(); } catch {}

    clearTimeout(gunTimeoutRef.current);
    gunTimeoutRef.current = setTimeout(() => {
      replaceLeftContent(tabKey);
      setGunState((s) => ({ ...s, firing: false }));
      gunTimeoutRef.current = setTimeout(() => {
        setGunState({ show: false, side: "left", firing: false });
      }, 400);
    }, 600);
  };

  /* ---------- HERO BUTTON ---------- */
  const onHeckYes = () => {
    try { clickAudio.currentTime = 0; clickAudio.play(); } catch {}
    setNavVisible(true);
    setPhotoInNav(true);
    triggerNavigationWithGun("about");
  };

  /* ---------- NAVBAR CLICK ---------- */
  const onNavClick = (key) => {
    if (key === activeTab) return;
    try { clickAudio.currentTime = 0; clickAudio.play(); } catch {}
    triggerNavigationWithGun(key);
  };

  /* ---------- NEXT / PREV ---------- */
  const goNext = () => {
    let i = tabOrder.indexOf(activeTab) + 1;
    if (i >= tabOrder.length) i = 2;
    if (tabOrder[i] === "story") i = 1;
    triggerNavigationWithGun(tabOrder[i]);
  };

  const goPrev = () => {
    let i = tabOrder.indexOf(activeTab) - 1;
    if (i < 2) i = tabOrder.length - 1;
    triggerNavigationWithGun(tabOrder[i]);
  };

  useEffect(() => () => clearTimeout(gunTimeoutRef.current), []);

  /* ---------- LEFT TEXT ---------- */
  const LeftText = ({ lines }) => {
    const [animate, setAnimate] = useState(false);
    useEffect(() => {
      if (animState === "in") {
        setAnimate(true);
        const t = setTimeout(() => setAnimate(false), 900);
        return () => clearTimeout(t);
      }
    }, [animState]);
    return (
      <div className={`left-lines ${animate ? "float-in" : ""}`}>
        {lines.map((ln, idx) => <p key={idx} className="left-line">{ln}</p>)}
      </div>
    );
  };

  /* ---------- GUN COMPONENT ---------- */
  const GunBlast = ({ side, firing }) => (
    <div className={`gun-blast ${side} ${firing ? "firing" : "smoke"}`}>
      <img src="/images/revolver.png" alt="gun" className={`gun-image ${side === "right" ? "flip" : ""}`} />
      <div className="muzzle" /><div className="bullet" /><div className="smoke" />
>>>>>>> db7ef00 (first commit)
    </div>
  );

  return (
    <div className="app-root">
<<<<<<< HEAD
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
=======

      {isWelcome && (
        <div className={`welcome-screen ${welcomeAnim}`}>
          <h1 className="welcome-title">Welcome To The Town of PORTFOLIO</h1>
          <button className="enter-town-btn" onClick={enterTown}>▶</button>
        </div>
      )}

      {/* NAVBAR ONLY AFTER HERO */}
      {navVisible && !["story", "hero"].includes(activeTab) && (
        <header className="top-nav nav-show">
          <div className="nav-inner">
            <div className="nav-left">
              Santhosh <span className="nav-sep">|</span> 9087847806
            </div>
            {tabOrder.filter(t => !["story", "hero"].includes(t)).map((tab) => (
              <button
                key={tab}
                className={`nav-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => onNavClick(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
            {photoInNav && <img ref={photoRef} src="/me.png" className="nav-photo" alt="Santhosh" />}
          </div>
        </header>
      )}

      {gunState.show && <GunBlast side={gunState.side} firing={gunState.firing} />}

      <main className="viewport">
        {!photoInNav && (
          <aside className="fixed-photo">
            <img ref={photoRef} src="/me.png" alt="Santhosh" />
          </aside>
        )}

        <section className="left-area">
          <div className={`left-wrapper ${animState === "out" ? "slide-out" : ""} ${animState === "in" ? "slide-in" : ""}`}>
            <LeftText lines={leftContent.titleLines} />
            {leftContent.showButton && (
              <button className="heck-btn" onClick={onHeckYes}>Heck Yes!</button>
>>>>>>> db7ef00 (first commit)
            )}
          </div>
        </section>
      </main>
<<<<<<< HEAD
    </div>
    <div className="ai-video-wrapper">
  <iframe
    id="heygenFrame"
    src="https://app.heygen.com/embedded-player/e18e3f6103434d2191dfac875864e50a&mute=true"
    allow="autoplay; encrypted-media; fullscreen;"
    frameBorder="0"
    allowFullScreen
    title="ai-avatar"
  ></iframe>

  {/* Mute / Unmute button */}
  <button className="mute-btn" id="muteToggleBtn">🔇</button>
</div>

=======

      {/* --------- PAGER LOGIC --------- */}
      {!isWelcome && activeTab === "story" && (
        <div className="pager-controls">
          <button className="pager-right" onClick={goNext}>▶</button>
        </div>
      )}

      {!isWelcome && !["story", "hero"].includes(activeTab) && (
        <div className="pager-controls">
          <button className="pager-left" onClick={goPrev}>◀</button>
          <button className="pager-right" onClick={goNext}>▶</button>
        </div>
      )}
    </div>
>>>>>>> db7ef00 (first commit)
  );
}
