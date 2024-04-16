import React, { useState } from "react";
import backgroundMusic from "../assets/bgmusic.mp3";

const BackgroundMusic = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div>
      <button onClick={toggleMusic}>
        {isMusicPlaying ? "Mute" : "Unmute"}
      </button>
      {isMusicPlaying && <audio src={backgroundMusic} autoPlay loop />}
    </div>
  );
};

export default BackgroundMusic;
