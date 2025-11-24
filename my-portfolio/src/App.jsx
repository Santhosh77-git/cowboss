import React, { useState, useRef, useEffect } from "react";
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

/* ---------- ORDER WITH STORY + HERO ---------- */
const tabOrder = ["story", "hero", "about", "skills", "testimonials", "certificates", "contact"];

export default function App() {
  // left content shown on the left panel
  const [leftContent, setLeftContent] = useState(contentByTab.story);
  const [animState, setAnimState] = useState("idle"); // idle | out | in
  const [activeTab, setActiveTab] = useState("story"); // start at story after welcome
  const [navVisible, setNavVisible] = useState(false); // navbar appears after hero normally
  const [photoInNav, setPhotoInNav] = useState(false);
  const photoRef = useRef(null);

  // welcome state: first screen (full page). clicking enterTown -> story
  const [isWelcome, setIsWelcome] = useState(true);
  const [welcomeAnim, setWelcomeAnim] = useState("");

  // gun overlay (revolver) state
  const [gunState, setGunState] = useState({ show: false, side: "left", firing: false });
  const gunTimeoutRef = useRef(null);

  // audio refs — initialize in effect so SSR/local dev won't break
  const clickAudioRef = useRef(null);
  const gunAudioRef = useRef(null);
  useEffect(() => {
    clickAudioRef.current = typeof Audio !== "undefined" ? new Audio("/sounds/click.mp3") : null;
    gunAudioRef.current = typeof Audio !== "undefined" ? new Audio("/sounds/gunshot.mp3") : null;
  }, []);

  /* ---------- ENTER TOWN → STORY (from welcome screen) ---------- */
  const enterTown = () => {
    setWelcomeAnim("fadeOut");
    setTimeout(() => {
      setIsWelcome(false);
      setLeftContent(contentByTab.story);
      setActiveTab("story");
      // keep navbar hidden while on story and hero (as requested)
      setNavVisible(false);
    }, 1000);
  };

  /* ---------- CONTENT TRANSITION (clean swap + animations) ---------- */
  const replaceLeftContent = (tabKey) => {
    const newContent = contentByTab[tabKey];
    if (!newContent) return;
    setAnimState("out");
    setTimeout(() => {
      setLeftContent(newContent);
      setAnimState("in");
      setActiveTab(tabKey);
      // show nav only after we leave hero/story (if we are in a section)
      if (!["story", "hero"].includes(tabKey)) {
        setNavVisible(true);
        setPhotoInNav(true);
      } else {
        // hide nav on story/hero
        setNavVisible(false);
      }
      setTimeout(() => setAnimState("idle"), 450);
    }, 350); // match CSS timing
  };

  /* ---------- GUN-STYLE NAVIGATION (visual + sound) ---------- */
  const triggerNavigationWithGun = (tabKey) => {
    const prevIndex = tabOrder.indexOf(activeTab);
    const newIndex = tabOrder.indexOf(tabKey);
    let side = newIndex > prevIndex ? "left" : "right";

    setGunState({ show: true, side, firing: true });
    try { gunAudioRef.current && (gunAudioRef.current.currentTime = 0, gunAudioRef.current.play()); } catch (e) {}

    clearTimeout(gunTimeoutRef.current);
    gunTimeoutRef.current = setTimeout(() => {
      replaceLeftContent(tabKey);
      setGunState((s) => ({ ...s, firing: false }));
      gunTimeoutRef.current = setTimeout(() => {
        setGunState({ show: false, side: "left", firing: false });
      }, 400);
    }, 600);
  };

  /* ---------- HERO BUTTON: heck yes (go to about and show navbar) ---------- */
  const onHeckYes = () => {
    try { clickAudioRef.current && (clickAudioRef.current.currentTime = 0, clickAudioRef.current.play()); } catch (e) {}
    // after hero, show navbar and move to about
    setNavVisible(true);
    setPhotoInNav(true);
    triggerNavigationWithGun("about");
  };

  /* ---------- NAVBAR CLICK ---------- */
  const onNavClick = (key) => {
    if (key === activeTab) return;
    try { clickAudioRef.current && (clickAudioRef.current.currentTime = 0, clickAudioRef.current.play()); } catch (e) {}
    triggerNavigationWithGun(key);
  };

  /* ---------- NEXT / PREV (pager) ---------- */
  const goNext = () => {
    // story -> hero, hero -> about, otherwise next (skip story during normal cycle)
    if (activeTab === "story") {
      replaceLeftContent("hero");
      return;
    }
    if (activeTab === "hero") {
      replaceLeftContent("about");
      return;
    }

    let idx = tabOrder.indexOf(activeTab);
    let nextIdx = (idx + 1) % tabOrder.length;
    // never land on story during normal forward cycle (put story only before hero)
    if (tabOrder[nextIdx] === "story") nextIdx = (nextIdx + 1) % tabOrder.length;
    triggerNavigationWithGun(tabOrder[nextIdx]);
  };

  const goPrev = () => {
    // about -> hero, hero -> story
    if (activeTab === "about") {
      replaceLeftContent("hero");
      return;
    }
    if (activeTab === "hero") {
      replaceLeftContent("story");
      return;
    }

    let idx = tabOrder.indexOf(activeTab);
    let prevIdx = (idx - 1 + tabOrder.length) % tabOrder.length;
    if (tabOrder[prevIdx] === "story") {
      // skip story when moving backwards within the main sections
      prevIdx = (prevIdx - 1 + tabOrder.length) % tabOrder.length;
    }
    triggerNavigationWithGun(tabOrder[prevIdx]);
  };

  useEffect(() => () => clearTimeout(gunTimeoutRef.current), []);

  /* ---------- LEFT TEXT COMPONENT (with small in animation hook) ---------- */
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
        {lines.map((ln, idx) => (
          <p key={idx} className="left-line">
            {ln}
          </p>
        ))}
      </div>
    );
  };

  /* ---------- GUN BLAST VISUAL ---------- */
  const GunBlast = ({ side, firing }) => (
    <div className={`gun-blast ${side} ${firing ? "firing" : "smoke"}`} aria-hidden="true">
      <img src="/images/revolver.png" alt="gun" className={`gun-image ${side === "right" ? "flip" : ""}`} />
      <div className="muzzle" />
      <div className="bullet" />
      <div className="smoke" />
    </div>
  );

  /* ---------- RENDER ---------- */
  return (
    <div className="app-root">
      {/* Welcome Screen */}
      {isWelcome && (
        <div className={`welcome-screen ${welcomeAnim}`}>
          <h1 className="welcome-title">Welcome To The Town of PORTFOLIO</h1>
          <p className="welcome-hint">Tap ▶ or swipe right to enter the town</p>
          <button className="enter-town-btn" onClick={enterTown}>▶</button>
        </div>
      )}

      {/* Navbar: visible only after we leave hero/story */}
      {navVisible && !["story", "hero"].includes(activeTab) && (
        <header className="top-nav nav-show" role="navigation" aria-label="Main">
          <div className="nav-inner">
            <div className="nav-left" aria-hidden="true">Santhosh <span className="nav-sep">|</span> 9087847806</div>

            <button className={`nav-btn ${activeTab === "about" ? "active" : ""}`} onClick={() => onNavClick("about")}>About</button>
            <button className={`nav-btn ${activeTab === "skills" ? "active" : ""}`} onClick={() => onNavClick("skills")}>Skills</button>
            <button className={`nav-btn ${activeTab === "testimonials" ? "active" : ""}`} onClick={() => onNavClick("testimonials")}>Testimonials</button>
            <button className={`nav-btn ${activeTab === "certificates" ? "active" : ""}`} onClick={() => onNavClick("certificates")}>Certificates</button>
            <button className={`nav-btn ${activeTab === "contact" ? "active" : ""}`} onClick={() => onNavClick("contact")}>Contact Me</button>

            {photoInNav && <img ref={photoRef} src="/me.png" className="nav-photo" alt="Santhosh" />}
          </div>
        </header>
      )}

      {/* Gun blast overlay */}
      {gunState.show && <GunBlast side={gunState.side} firing={gunState.firing} />}

      {/* Main viewport */}
      <main className="viewport">
        {/* fixed photo right side (hidden from assistive tech) */}
        <aside className="fixed-photo" aria-hidden="true">
          <img ref={photoRef} src="/me.png" alt="Santhosh" />
        </aside>

        <section className="left-area" aria-live="polite">
          <div className={`left-wrapper ${animState === "out" ? "slide-out" : ""} ${animState === "in" ? "slide-in" : ""}`}>
            <LeftText lines={leftContent.titleLines} />

            {/* if current left content wants a button (hero) */}
            {leftContent.showButton && (
              <button className="heck-btn" onClick={onHeckYes}>Heck Yes!</button>
            )}
          </div>
        </section>
      </main>

      {/* Pager controls:
          - story page shows only right arrow (go to hero)
          - hero shows no pager
          - other pages show left+right */}
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
  );
}
