// components/MainMenu.js
import React from "react";
import { Link } from "react-router-dom";

const MainMenu = () => {
  return (
    <div className="main-menu">
      <h1>Text-Based Quiz Game</h1>
      <ul>
        <li>
          <Link to="/game">Game</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <button onClick={handleExit}>Exit</button>
        </li>
      </ul>
    </div>
  );
};

const handleExit = () => {
  window.close(); // Close the web app
};

export default MainMenu;
