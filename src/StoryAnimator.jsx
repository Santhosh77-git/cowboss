import { useState, useEffect } from "react";

export default function StoryAnimator({ lines, onFinish }) {
  const [displayedText, setDisplayedText] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    // Blink cursor
    const blink = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 450);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
  // Reset animation when lines change (i.e., when entering story tab)
  setDisplayedText([]);
  setCurrentLine(0);
  setCurrentChar(0);
}, [lines]);


  useEffect(() => {
    if (!lines || lines.length === 0) return;

    const text = lines[currentLine];

    if (currentChar < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => {
          const copy = [...prev];
          copy[currentLine] = (copy[currentLine] || "") + text[currentChar];
          return copy;
        });
        setCurrentChar((c) => c + 1);
      }, 50); // 🔥 letter speed

      return () => clearTimeout(timeout);
    } else {
      // Done typing one paragraph
      if (currentLine < lines.length - 1) {
        const timeout = setTimeout(() => {
          setCurrentLine((l) => l + 1);
          setCurrentChar(0);
        }, 350); // 🔥 P2 paragraph pause
        return () => clearTimeout(timeout);
      } else {
        // All paragraphs complete
        const timeout = setTimeout(() => onFinish && onFinish(), 500);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentChar, currentLine, lines, onFinish]);

  return (
    <div className="story-animated-block" style={{ opacity: displayedText.length === 0 ? 0 : 1 }}>
      {lines.map((original, idx) => {
        const typed = displayedText[idx] || "";
        const isActiveLine = idx === currentLine;
        const showCursor = isActiveLine && cursorVisible;

        return (
          <p key={idx} className="story-line typewriter-line">
            {typed}
            {showCursor && <span className="cursor">|</span>}
          </p>
        );
      })}
    </div>
  );
}
