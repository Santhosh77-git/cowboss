import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import "./index.css"
import Splash from "./Splash.jsx";
import StoryAnimator from "./StoryAnimator.jsx";
import NavBar from "./NavBar";


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
<p class="gold-text">TEST GOLD HEADING</p>

/* ---------- ORDER WITH NEW STORY SCREEN ---------- */
const tabOrder = ["story", "hero", "about", "skills", "testimonials", "certificates", "contact"];

export default function App() {
  const [leftContent, setLeftContent] = useState(contentByTab.story);
  const [animState, setAnimState] = useState("idle");
  const [activeTab, setActiveTab] = useState("story");
  const [navVisible, setNavVisible] = useState(false);
  const [photoInNav, setPhotoInNav] = useState(false);
  const [navRollOpen, setNavRollOpen] = useState(false);

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
  /* ---------- GUN-STYLE NAVIGATION (robust, handles wrap-around) ---------- */
const triggerNavigationWithGun = (tabKey, forcedSide) => {
  const prevIndex = tabOrder.indexOf(activeTab);
  const newIndex = tabOrder.indexOf(tabKey);

  if (prevIndex === -1 || newIndex === -1) {
    // fallback: just navigate if indices are invalid
    replaceLeftContent(tabKey);
    return;
  }

  // decide side: if caller provided forcedSide, use it (explicit)
  let side;
  if (forcedSide) {
    side = forcedSide;
  } else {
    // compute shortest direction on circular list
    const N = tabOrder.length;
    // diff in range [0, N-1], number of steps forward from prevIndex to newIndex
    const diff = (newIndex - prevIndex + N) % N;
    // if diff === 0 -> same tab (not expected)
    // if diff <= N/2 -> treat as "forward" (left), else "backward" (right)
    side = diff === 0 ? "left" : (diff <= Math.floor(N / 2) ? "left" : "right");
  }

  setGunState({ show: true, side, firing: true });
  try { gunAudio.currentTime = 0; gunAudio.play(); } catch {}

  clearTimeout(gunTimeoutRef.current);
  gunTimeoutRef.current = setTimeout(() => {
    // perform the actual navigation
    replaceLeftContent(tabKey);

    // stop firing animation but keep gun visible briefly
    setGunState((s) => ({ ...s, firing: false }));

    // then hide the gun
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
    setTimeout(() => setNavRollOpen(true), 500);

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
  if (i >= tabOrder.length) i = 2; // keep your original wrap rule
  if (tabOrder[i] === "story") i = 1;
  // moving forward → show gun on LEFT side (explicit)
  triggerNavigationWithGun(tabOrder[i], "left");
};

const goPrev = () => {
  let i = tabOrder.indexOf(activeTab) - 1;
  if (i < 2) i = tabOrder.length - 1;
  // moving backward → show gun on RIGHT side (explicit)
  triggerNavigationWithGun(tabOrder[i], "right");
};


  useEffect(() => () => clearTimeout(gunTimeoutRef.current), []);

  /* ---------- LEFT TEXT ---------- */
  /* ---------- LEFT TEXT (with golden headings) ---------- */
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
      {lines.map((line, index) => (
        <p
          
          className={`left-line ${index === 0 ? "gold-text" : ""}`}
          key={index}
        >
          {line}
        </p>
      ))}
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

    {!showSplash && activeTab === "story" &&  (
  <div className="pager-controls first-pager">
    <button className="pager-right" onClick={goNext}>🡺</button>
  </div>
)}


      {/* NAVBAR ONLY AFTER HERO */}
      {/* NAVBAR ONLY AFTER HERO */}
{navVisible && !["story", "hero"].includes(activeTab) && (
  <NavBar
    activeTab={activeTab}
    photoInNav={photoInNav}
    triggerOpen={navRollOpen}     // 👈 NEW
    onNavigate={onNavClick}       // 👈 NEW
  />
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
    {/* STORY SECTION - only StoryAnimator, no fallback */}
{!showSplash && activeTab === "story" && (
  <StoryAnimator
    key="story-animator"
    lines={leftContent.titleLines}
    onFinish={() => {
      setPhotoInNav(false);
      setTimeout(() => {
        setPhotoInNav(false);
        setTimeout(() => {
          setNavVisible(true);
        }, 1000);
      }, 300);
    }}
  />
)}

{/* ALL OTHER SECTIONS */}
{activeTab !== "story" && (
  <LeftText lines={leftContent.titleLines} />
)}


    {/* HERO BUTTON ONLY */}
    {leftContent.showButton && (
      <button className="heck-btn" onClick={onHeckYes}>
        Handshake🫱🏽‍🫲🏻!
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
