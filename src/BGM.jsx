import { useEffect, useRef, useState } from "react";

export default function BGM() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.5;

    // Autoplay fix: try to play on first user interaction
    const tryPlay = () => {
      audio.play().catch(() => {});
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
    };

    window.addEventListener("click", tryPlay);
    window.addEventListener("touchstart", tryPlay);
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (muted) {
      audio.muted = false;
      audio.play();
    } else {
      audio.muted = true;
    }
    setMuted(!muted);
  };

  return (
    <>
      <audio ref={audioRef} src="bgm.mp3" muted />

      <button 
        onClick={toggleMute} 
        className="bgm-toggle"
      >
        {muted ? "🔇 BGM" : "🔊 BGM"}
      </button>
    </>
  );
}
