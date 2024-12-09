import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function GameBoard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve or initialize board state and player turn
  const [board, setBoard] = useState(location.state?.board || Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(location.state?.isXTurn ?? true);
  const [winner, setWinner] = useState(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Handle cell clicks
  const handleClick = (index) => {
    if (board[index] || winner || hasPlayed) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
    setHasPlayed(true);
  };

  // Check for a winner
  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  // Check for a winner whenever the board updates
  useEffect(() => {
    const gameWinner = checkWinner(board);
    if (gameWinner) setWinner(gameWinner);
  }, [board]);

  // Pass board state and turn to the trivia screen
  const handleNextPlayer = () => {
    navigate("/trivia", { state: { board, isXTurn } });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Tic Tac Toe</h1>
      {winner ? (
        <h2 style={styles.winnerText}>🎉 {winner} Wins! 🎉</h2>
      ) : (
        <h2 style={styles.turnText}>
          {isXTurn ? "Player X's Turn" : "Player O's Turn"}
        </h2>
      )}

      <div style={styles.grid}>
        {board.map((cell, index) => (
          <div key={index} style={styles.cell} onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>

      <button style={styles.button} onClick={handleNextPlayer}>
        Next Player
      </button>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#102a43",
  },
  winnerText: {
    fontSize: "1.8rem",
    color: "#2d6a4f",
    marginBottom: "20px",
  },
  turnText: {
    fontSize: "1.5rem",
    color: "#334e68",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 100px)", // 3 equal columns
    gridTemplateRows: "repeat(3, 100px)", // 3 equal rows
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  cell: {
    width: "100px",
    height: "100px",
    backgroundColor: "#f7fafc",
    border: "2px solid #627d98",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#102a43",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#627d98",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    transition: "background 0.3s ease-in-out",
  },
};

export default GameBoard;
