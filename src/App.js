// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";
import Settings from "./components/Settings";

function App() {
  // Define state for timer duration
  const [timerDuration, setTimerDuration] = useState(10); // Initial timer duration

  return (
    <Router>
      <Routes>
        {/* Pass timerDuration and setTimerDuration as props to the Settings component */}
        <Route
          path="/settings"
          element={
            <Settings
              timerDuration={timerDuration}
              setTimerDuration={setTimerDuration}
            />
          }
        />
        {/* Pass timerDuration as a prop to the Game component */}
        <Route path="/game" element={<Game timerDuration={timerDuration} />} />
        <Route path="/" element={<MainMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
