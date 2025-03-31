import React, { useState, useEffect, useRef } from "react";
import "./ScrapbookPage.css";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

const AadhyaPage = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [revealedNotes, setRevealedNotes] = useState({});
  const [width, height] = useWindowSize();
  const [emojiTrail, setEmojiTrail] = useState([]);
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

  const handleMouseMove = (e) => {
    const newEmoji = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      emoji: ["🩵", "🦕", "🌀", "🌟", "🌊"][Math.floor(Math.random() * 5)],
    };
    setEmojiTrail((prev) => [...prev, newEmoji]);
    setTimeout(() => {
      setEmojiTrail((prev) => prev.filter((item) => item.id !== newEmoji.id));
    }, 1200);
  };

  const memories = [
    "aadhya9.jpg", "aadhya10.jpg", "aadhya11.JPG", "aadhya12.JPG", "aadhya13.JPG",
    "aadhya14.jpeg", "aadhya15.jpeg", "aadhya16.jpeg", "aadhya17.jpeg", "aadhya18.jpeg",
    "aadhya19.jpeg", "aadhya20.JPG", "aadhya21.JPG", "aadhya22.JPG", "aadhya23.JPG",
    "aadhya24.JPG", "aadhya25.JPG"
  ];

  return (
    <div className="scrapbook" onMouseMove={handleMouseMove}>
      <audio ref={audioRef} src="/aadhyasong.mp3" loop />

      {showConfetti && <Confetti width={width} height={height} numberOfPieces={300} />}

      {/* Hero Section */}
      <div className="intro">
        <h1>🎉 Happy Birthday Aadhya 💙</h1>
        <div className="scroll-down" onClick={handleScroll}>⬇</div>
        <button className="play-button" onClick={() => {
          audioRef.current.play();
          setIsPlaying(true);
        }}>
          {isPlaying ? "💙 Vibing 💙" : "🎵 Play this shit"}
        </button>
      </div>

      {/* Polaroid Strip */}
      <div className="photobooth-strip-vertical">
        {[1, 2, 3, 4].map((num, index) => (
          <div key={index} className="strip-frame">
            <img src={`/aadhyastrip${num}.jpg`} alt={`strip ${num}`} />
            <p>{[
              "Matching chaos 🧁",
              "Looking cute 💅",
              "Too many giggles 😭",
              "My fav twin 💙"
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
              <p>Best day ever 🧁</p>
            </div>
            <div
              className={`note ${revealedNotes[index] ? "revealed" : ""}`}
              onClick={() => toggleNote(index)}
            >
              <p>
                Everything with you feels like a core memory. Grateful for all the love and chaos 💕
              </p>
            </div>
          </div>
        ))}

        {/* Flip Message */}
        <div className="postcard-flip">
          <div
            className={`postcard-inner ${revealedNotes["postcard"] ? "flipped" : ""}`}
            onClick={() => toggleNote("postcard")}
          >
            <div className="postcard-front">
              <img src="/aadhya11.JPG" alt="Postcard" />
              <p>💌 Tap to flip</p>
            </div>
            <div className="postcard-back">
              <p>
                Dear Aadhya,  
                You are joy in human form. From your ideas to your chaos,  
                every bit of you is unforgettable.  
                Here’s to more silly photos and deeper convos.  
                <br /><br />
                Love you beyond words 💙  
                —Me
              </p>
            </div>
          </div>
        </div>

        {/* Final Video Section */}
        <div className="video-section">
          <h2>🎥 Press Play for a Surprise</h2>
          <video controls width="80%">
            <source src="/assets/aadhya-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Final Message */}
        <div className="final-message">
          <p>💌 I love you forever. This scrapbook is just a tiny piece of the joy you bring me every day 💙</p>
        </div>

        {/* Gift Box Section */}
        <div className="gift-box-section">
          <div
            className={`gift-box ${revealedNotes.gift ? "opened" : ""}`}
            onClick={() => toggleNote("gift")}
          >
            🎁
          </div>
          {revealedNotes.gift && (
            <div className="gift-reveal">
              <p>💌 Surprise! Here's a little extra love just for you 💙</p>
              <a href="/assets/aadhya-surprise.pdf" download className="download-btn">📥 Open Your Gift</a>
            </div>
          )}
        </div>
      </div>

      {/* Emoji Trail Effect */}
      {emojiTrail.map((item) => (
        <span
          key={item.id}
          className="emoji-trail"
          style={{ left: item.x + "px", top: item.y + "px" }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
};

export default AadhyaPage;
