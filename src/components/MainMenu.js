import React from "react";
import { Outlet, Link } from "react-router-dom";

const MainMenu = () => {
  return (
    <div className="main-menu">
      <h1>Text-Based Quiz Game</h1>
      <ul>
        <li>
          <Link to="/game">Start a New Game</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <button onClick={handleExit}>Exit the Game</button>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

const handleExit = () => {
  window.close(); // Close the game window
};

export default MainMenu;
