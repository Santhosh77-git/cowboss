import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./NavBar.css"; // includes ThunderBrief font

export default function NavBar({ onNavigate }) {
  const [open, setOpen] = useState(false);

  const tabs = ["About", "Skills", "Testimonials", "Certificates", "Contact"];

  const toggleMap = () => {
    const audio = new Audio("/fold-open.mp3"); // public asset
    audio.play();
    setOpen(!open);
  };

  const handleNavigate = (tab) => {
    onNavigate?.(tab.toLowerCase());
    setOpen(false); // close map after clicking item
  };

  return (
    <>
      {/* Map Button */}
      <button className="map-button" onClick={toggleMap}>
        MAP
      </button>

      {/* Animated Map */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="cowboy-map-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              backgroundImage: "url('/parchment-texture.png')", // public asset
            }}
          >
            <ul className="map-links">
              {tabs.map((tab) => (
                <li key={tab}>
                  <button
                    className="map-link"
                    onClick={() => handleNavigate(tab)}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
