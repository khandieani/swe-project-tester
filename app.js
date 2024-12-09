import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen";
import CategorySelection from "./components/CategorySelection";
import TriviaScreen from "./components/TriviaScreen";
import GameBoard from "./components/GameBoard";
import EndGameScreen from "./components/EndGameScreen";

function App() {
  const [isXTurn, setIsXTurn] = useState(true); // Track player turns

  // Function to switch to the next player
  const setNextPlayer = () => {
    setIsXTurn((prev) => !prev);
  };

  return (
    <Router>
      <Routes>
        {/* Welcome Screen */}
        <Route path="/" element={<WelcomeScreen />} />

        {/* Category Selection Screen */}
        <Route path="/categories" element={<CategorySelection />} />

        {/* Trivia Screen */}
        <Route
          path="/trivia"
          element={<TriviaScreen setNextPlayer={setNextPlayer} />}
        />

        {/* Game Board Screen */}
        <Route path="/gameboard" element={<GameBoard />} />

        {/* End Game Screen */}
        <Route path="/end" element={<EndGameScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
