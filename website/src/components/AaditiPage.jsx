import React, { useState, useEffect, useRef } from "react";
import "./ScrapbookPage.css";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

const AaditiPage = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [revealedNotes, setRevealedNotes] = useState({});
  const [width, height] = useWindowSize();
  const [emojiTrail, setEmojiTrail] = useState([]);

const handleMouseMove = (e) => {
  const newEmoji = {
    id: Date.now(),
    x: e.clientX,
    y: e.clientY,
    emoji: ["✨", "🌟", "💛", "🧡","🍑", "🍓", "🍒", "💛", "✨"][Math.floor(Math.random() * 5)],
  };

  setEmojiTrail((prev) => [...prev, newEmoji]);

  setTimeout(() => {
    setEmojiTrail((prev) => prev.filter((item) => item.id !== newEmoji.id));
  }, 1200); // emoji disappears after 1.2s
};


  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = () => {
    const scrapbook = document.getElementById("scrapbook-content");
    scrapbook.scrollIntoView({ behavior: "smooth" });
  };

  const toggleNote = (index) => {
    setRevealedNotes((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const memories = [
    "aaditi1.jpg", "aaditi2.jpg", "aaditi3.JPG", "aaditi4.JPG", "aaditi5.JPG",
    "aaditi6.jpeg", "aaditi7.jpeg", "aaditi8.jpeg", "aaditi9.jpeg", "aaditi10.jpeg"
  ];

  return (
    <div className="scrapbook aaditi-theme" onMouseMove={handleMouseMove}>  
      <audio ref={audioRef} src="/aaditisong.mp3" loop />

      {showConfetti && <Confetti width={width} height={height} numberOfPieces={300} />}

      {/* Hero Section */}
      <div className="intro">
        <h1>☀️ Happy Birthday Aaditi 🧡</h1>
        <div className="scroll-down" onClick={handleScroll}>⬇</div>
        <button className="play-button" onClick={() => {
          audioRef.current.play();
          setIsPlaying(true);
        }}>
          {isPlaying ? "✨ Vibes On ✨" : "🎵 Play this shit"}
        </button>
      </div>

      <div className="photobooth-strip-vertical">
  {[1, 2, 3, 4].map((num, index) => (
    <div key={index} className="strip-frame">
      <img src={`/aaditistrip${num}.jpg`} alt={`strip ${num}`} />
      <p>{[
        "Us being extra 💅",
        "Too cool for school 😎",
        "Lil goofy moment 🤪",
        "Forever besties 💛"
      ][index]}</p>
    </div>
  ))}
</div>


      {/* Scrapbook Content */}
      <div id="scrapbook-content" className="scrapbook-content">
        {memories.map((filename, index) => (
          <div className="page-section" key={index}>
            <div className="photo-frame">
              <img src={`/${filename}`} alt={`Memory ${index + 1}`} />
              <p>Sunshine in human form ☀️</p>
            </div>
            <div
              className={`note ${revealedNotes[index] ? "revealed" : ""}`}
              onClick={() => toggleNote(index)}
            >
              <p>
                You radiate joy wherever you go — the world is brighter with you in it 💫🌼
              </p>
            </div>
          </div>
        ))}
        <div className="postcard-flip">
  <div className={`postcard-inner ${revealedNotes["postcard"] ? "flipped" : ""}`}
       onClick={() => toggleNote("postcard")}>
    
    {/* Front - Postcard Image */}
    <div className="postcard-front">
      <img src="/aadhya10.jpg" alt="Postcard" />
      <p>💌 Tap to open</p>
    </div>

    {/* Back - Sweet message */}
    <div className="postcard-back">
      <p>
        Dear Aaditi,  
        You bring so much sunshine and laughter into my life.  
        This little scrapbook could never fully capture how special you are,  
        but I hope it makes you smile.  
        <br /><br />
        Happy Birthday, golden soul ☀️💛  
        Love you forever,
        <br />— Me 🧡
      </p>
    </div>
  </div>
</div>


        {/* Final Video Section */}
        <div className="video-section">
          <h2>🎥 Press Play for a Sunshine Surprise</h2>
          <video controls width="80%">
            <source src="/assets/aaditi-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Final Message */}
        <div className="final-message aaditi-message">
          <p>🌞 You’re a burst of sunshine wrapped in laughter and love. Keep glowing, golden girl! 🧡</p>
        </div>
      </div>
      <div className="gift-box-section">
  <div className={`gift-box ${revealedNotes.gift ? "opened" : ""}`} onClick={() => toggleNote("gift")}>
    🎁
  </div>

  {revealedNotes.gift && (
    <div className="gift-reveal">
      <p>💌 Surprise! Here's a little extra love just for you 🧡</p>
      <a href="/assets/aaditi-surprise.pdf" download className="download-btn">📥 Open Your Gift</a>
    </div>
  )}
</div>

      {emojiTrail.map((item) => (
  <span
    key={item.id}
    className="emoji-trail"
    style={{
      left: item.x + "px",
      top: item.y + "px",
    }}
  >
    {item.emoji}
  </span>
))}
    </div>
  );
};

export default AaditiPage;
