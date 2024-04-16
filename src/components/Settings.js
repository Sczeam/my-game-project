// Settings.js
import React, { useState } from "react";

const Settings = ({ timerDuration, setTimerDuration }) => {
  const [timerValue, setTimerValue] = useState(timerDuration);

  const handleChange = (event) => {
    const newTimerValue = parseInt(event.target.value);
    setTimerValue(newTimerValue);
  };

  const handleSaveSettings = () => {
    setTimerDuration(timerValue);
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <label htmlFor="timer">Timer Duration: {timerValue} seconds</label>
      <input
        type="range"
        id="timer"
        name="timer"
        min="5"
        max="60"
        value={timerValue}
        onChange={handleChange}
      />
      <button onClick={handleSaveSettings}>Save Settings</button>
    </div>
  );
};

export default Settings;
