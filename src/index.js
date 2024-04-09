import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";
import Settings from "./components/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />}>
          <Route path="MainMenu" element={<MainMenu />} />
          <Route path="Game" element={<Game />} />
          <Route path="Settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
