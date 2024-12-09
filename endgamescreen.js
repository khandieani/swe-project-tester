import React from "react";
import { useNavigate } from "react-router-dom";

function EndGameScreen() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>You Win!</h1>
      <button onClick={() => navigate("/")}>Play Again</button>
    </div>
  );
}

export default EndGameScreen;
