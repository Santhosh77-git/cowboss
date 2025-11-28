import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import "./index.css"
import Splash from "./Splash.jsx";
import StoryAnimator from "./StoryAnimator.jsx";

/* ---------- HERO ---------- */
const initialLeft = {
  id: "hero",
  titleLines: [
    "These are the Stuffs,we have",
    "If you Believe in our Boss,Let's Handshake",
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
  about: {
    id: "about",
    titleLines: [
      "About",
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

/* ---------- ORDER WITH NEW STORY SCREEN ---------- */
const tabOrder = ["story", "hero", "about", "skills", "testimonials", "certificates", "contact"];

export default function App() {
  const [leftContent, setLeftContent] = useState(contentByTab.story);
  const [animState, setAnimState] = useState("idle");
  const [activeTab, setActiveTab] = useState("story");
  const [navVisible, setNavVisible] = useState(false);
  const [photoInNav, setPhotoInNav] = useState(false);
  const photoRef = useRef(null);

  
  const [showSplash, setShowSplash] = useState(true);

  const [gunState, setGunState] = useState({ show: false, side: "left", firing: false });
  const gunTimeoutRef = useRef(null);

  // ✅ Updated audio paths for GitHub Pages
  const clickAudio = useRef(new Audio(import.meta.env.BASE_URL + "sounds/click.mp3")).current;
  const gunAudio = useRef(new Audio(import.meta.env.BASE_URL + "sounds/gunshot.mp3")).current;
  const finishSplash = () => {
  setShowSplash(false);
};


  

  /* ---------- CONTENT TRANSITION ---------- */
  const replaceLeftContent = (tabKey) => {
    const newContent = contentByTab[tabKey];
    if (!newContent) return;
    setAnimState("out");
    setTimeout(() => {
      setLeftContent(newContent);
      setAnimState("in");
      setActiveTab(tabKey);
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
      <img src={import.meta.env.BASE_URL + "images/revolver.png"} alt="gun" className={`gun-image ${side === "right" ? "flip" : ""}`} />
      <div className="muzzle" /><div className="bullet" /><div className="smoke" />
    </div>
  );

  return (
  <div className="app-root">
    {/* 🔥 BACKGROUND VIDEO (LOOPS FOREVER) */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="bg-video"
    >
      <source src={import.meta.env.BASE_URL + "bg-video.mp4"} type="video/mp4" />

    </video>
    {showSplash && <Splash onFinish={finishSplash} />}

    {!showSplash && activeTab === "story" && (
  <div className="pager-controls first-pager">
    <button className="pager-right" onClick={goNext}>🡺</button>
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
            {photoInNav && <img ref={photoRef} src={import.meta.env.BASE_URL + "me.png"} className="nav-photo" alt="Santhosh" />}
          </div>
        </header>
      )}

      {gunState.show && <GunBlast side={gunState.side} firing={gunState.firing} />}

      <main className="viewport">
        {!photoInNav && !["story", "hero"].includes(activeTab) && (

          <aside className="fixed-photo">
            <img ref={photoRef} src={import.meta.env.BASE_URL + "me.png"} alt="Santhosh" />
          </aside>
        )}

        <section className="left-area">
  <div
    className={`left-wrapper ${
      animState === "out" ? "slide-out" : ""
    } ${animState === "in" ? "slide-in" : ""}`}
  >

    {/* STORY MODE USES ANIMATOR */}
    {activeTab === "story" ? (
      <StoryAnimator
        lines={leftContent.titleLines}
        onFinish={() => {
          // hide photo → reveal later
          setPhotoInNav(false);

          // after words finish → show photo
          setTimeout(() => {
            setPhotoInNav(false);

            // after photo → show navbar/pager
            setTimeout(() => {
              setNavVisible(true);
            }, 1000);
          }, 300);
        }}
      />
    ) : (
      // DEFAULT LEFT TEXT FOR ALL OTHER TABS
      <LeftText lines={leftContent.titleLines} />
    )}

    {/* HERO BUTTON ONLY */}
    {leftContent.showButton && (
      <button className="heck-btn" onClick={onHeckYes}>
        Handshake🫱🏽‍🫲🏻!!
      </button>
    )}
  </div>
</section>

      </main>

      
      {!showSplash && !["story", "hero"].includes(activeTab) && (

        <div className="pager-controls">
          <button className="pager-left" onClick={goPrev}>🡸</button>
          <button className="pager-right" onClick={goNext}>🡺</button>
        </div>
      )}
    </div>
  );
}
