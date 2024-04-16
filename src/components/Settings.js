import React, { useState } from "react";
import { Link } from "react-router-dom";

const Settings = ({ timerDuration, setTimerDuration }) => {
  const [tempTimerDuration, setTempTimerDuration] = useState(timerDuration);

  const handleSaveSettings = () => {
    setTimerDuration(tempTimerDuration);
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="timer-duration">
        <label>Timer Duration:</label>
        <input
          type="range"
          min={5}
          max={60}
          value={tempTimerDuration}
          onChange={(e) => setTempTimerDuration(parseInt(e.target.value))}
        />
        <span>{tempTimerDuration} seconds</span>
      </div>
      <button onClick={handleSaveSettings}>Save</button>
      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default Settings;
