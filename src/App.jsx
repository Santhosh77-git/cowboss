import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import "./index.css"
import Splash from "./Splash.jsx";
import StoryAnimator from "./StoryAnimator.jsx";
import NavBar from "./NavBar";
import Certificates from "./Certificates";
import Skills from "./Skills";
import BGM from "./BGM";



/* ---------- HERO ---------- */
const initialLeft = {
  id: "hero",
  titleLines: [
    "Agreement",
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
      "Before ya step foot in this town, listen up...",
      "I’m my boss’s shadow, and I’m here to speak for his profession.",
      "",
      "I’ll hand ya the map of this here land—so gear up, the ride’s about to begin.",
      "Now spit it out… what’s your name?",
      
    ],
    showButton: false,
  },
  hero: initialLeft,
  about: {
    id: "about",
    titleLines: [
      "About",
      `He's our Boss,SANTHOSH`,
      `An engineering student who loves turning ideas into working systems that solve real problems.`,
      `He enjoy experimenting with both software and hardware, especially projects involving automation, AI, and smart technologies.`,
      `He currently seeking an internship where he can learn from real-world challenges, contribute to meaningful work, and grow as an engineer.`,
      `He believe in staying curious, asking questions, and improving a little every day. Beyond academics, He's someone who enjoys building, exploring, and understanding how things work at the core.`,
    ],
    showButton: false,
  },
  skills: {
    id: "skills",
    titleLines: [
    ],
    showButton: false,
  },
  
  certificates: {
  id: "certificates",
  titleLines: [], // Only heading on left
  showButton: false,
},

  contact: {
  id: "contact",
  titleLines: [
    "Contact Him",
    
  ],
  showButton: false,
},

};
<p class="gold-text">TEST GOLD HEADING</p>

/* ---------- ORDER WITH NEW STORY SCREEN ---------- */
const tabOrder = ["story", "hero", "about", "skills", "certificates", "contact"];

export default function App() {
  const [leftContent, setLeftContent] = useState(contentByTab.story);
  const [animState, setAnimState] = useState("idle");
  const [activeTab, setActiveTab] = useState("story");
  const [navVisible, setNavVisible] = useState(false);
  const [photoInNav, setPhotoInNav] = useState(false);
  const [navRollOpen, setNavRollOpen] = useState(false);
  const [mapAutoPlayed, setMapAutoPlayed] = useState(false);
  const [mapOpen, setMapOpen] = useState(false); // your existing map state
  const [showPager, setShowPager] = useState(false);


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
const LeftText = ({ lines, onReachBottom }) => {

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (animState === "in") {
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 900);
      return () => clearTimeout(t);
    }
  }, [animState]);

  useEffect(() => {
  if (activeTab === "about" && !mapAutoPlayed) {
    // Trigger map open
    setMapOpen(true);

    // Auto-close after 1.5 seconds
    setTimeout(() => {
      setMapOpen(false);
    }, 1500);

    setMapAutoPlayed(true); // mark as played
  }
}, [activeTab, mapAutoPlayed]);


  return (
    <div 
  className={`left-lines ${animate ? "float-in" : ""}`}
  onScroll={(e) => {
    if (!onReachBottom) return;
    const el = e.target;
    const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
    onReachBottom(isBottom);
  }}
>


      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {/* GOLD HEADING FIRST LINE */}
          <p className={`left-line ${index === 0 ? "gold-text" : ""}`}>
            {line}
          </p>
          
          {/* 👉 INSERT PHOTO AFTER SECOND LINE ("He's our Cowboss, SANTHOSH") */}
          {activeTab === "about" && index === 1 && (
            <div className="about-photo-wrapper">
              <img
                src={import.meta.env.BASE_URL + "me.png"}
                alt="Santhosh"
                className="about-photo"
              />
            </div>
          )}
          {/* CONTACT SECTION SPECIAL UI */}
{activeTab === "contact" && index === 0 && (
  <div className="contact-center">

    {/* SUBTEXT */}
    <p className="contact-subtext">
      “If you reckon he’s the Right Man for your project,<br />
      Track him down through this Trail here.”
    </p>

    {/* ICONS (Emoji-based) */}
    LinkedIn:
    <div className="contact-icons">

      {/* LINKEDIN */}
      <a
        className="contact-item"
        href="https://www.linkedin.com/in/santhoshmuruganandham023/"
        target="_blank"
        rel="noopener noreferrer"
      >
        🔗 LinkedIn
      </a>

      {/* GMAIL */}
      Gmail:
      <a
        className="contact-item"
        href="mailto:santhoshmuruganandham023@gmail.com"
      >
        📧 Gmail
      </a>

      {/* PHONE */}
      For Call:
      <a className="contact-item" href="tel:+919087847806">
        📞 +91 9087847806
      </a>

    </div>

    {/* FEEDBACK TEXT */}
    <p className="feedback-text">
      “And If our Town earned your Respect,<br />
      carve your feedback right here.”
    </p>

    {/* MIC BUTTON (kept as button — must trigger JS) */}
    <button className="mic-btn" onClick={startRecording}>
      🎙️....🎙️{recording ? "Recording..." : ""}
    </button>

    {/* AUDIO PLAYER */}
    {audioURL && (
      <audio controls className="feedback-audio">
        <source src={audioURL} type="audio/wav" />
      </audio>
    )}
  </div>
)}


        </React.Fragment>
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
  /* ---------- VOICE FEEDBACK ---------- */
const [recording, setRecording] = useState(false);
const [audioURL, setAudioURL] = useState("");


const startRecording = async () => {
  if (recording) return;

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const recorder = new MediaRecorder(stream);

  setRecording(true);

  let audioChunks = [];

  recorder.ondataavailable = (e) => audioChunks.push(e.data);

  recorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    const url = URL.createObjectURL(audioBlob);
    setAudioURL(url);
    setRecording(false);
  };

  recorder.start();

  // max recording 5 sec
  setTimeout(() => recorder.stop(), 10000);
};


  return (
  <div className="app-root">

    <BGM />   {/* 🔥 Added here */}

    {/* 🔥 BACKGROUND VIDEO (LOOPS FOREVER) */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="bg-video"
    >
      <source
        src={import.meta.env.BASE_URL + "bg-video.mp4"}
        type="video/mp4"
      />
    </video>

    {showSplash && <Splash onFinish={finishSplash} />}

    {!showSplash && activeTab === "story" &&  (
  <div className="pager-controls first-pager">
    <button className="pager-right" onClick={goNext}>⮞</button>
  </div>
)}


      {/* NAVBAR ONLY AFTER HERO */}
      {/* NAVBAR ONLY AFTER HERO */}
{navVisible && !["story", "hero"].includes(activeTab) && (
  <NavBar
    activeTab={activeTab}
    photoInNav={photoInNav}
    triggerOpen={navRollOpen} 
    mapOpen={mapOpen}       // 👈 NEW
    onNavigate={onNavClick}       // 👈 NEW
  />
)}




      {gunState.show && <GunBlast side={gunState.side} firing={gunState.firing} />}

      <main className="viewport">
        

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
{/* ALL SECTIONS EXCEPT STORY / CERTIFICATES / SKILLS USE LeftText */}
{activeTab !== "story" &&
 activeTab !== "certificates" &&
 activeTab !== "skills" && (
  <LeftText 
  lines={leftContent.titleLines}
  onReachBottom={(value) => setShowPager(value)}
/>

)}


{activeTab === "skills" && <Skills />}


{activeTab === "certificates" && <Certificates />}



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
          <button className="pager-left" onClick={goPrev}>⮜</button>
          <button className="pager-right" onClick={goNext}>⮞</button>
        </div>
        
      )}
    </div>
    
  );
}
