import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TriviaScreen({ setNextPlayer }) {
  const navigate = useNavigate();

  const triviaQuestions = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "Who painted the Mona Lisa?", answer: "Da Vinci" },
    { question: "What is the largest ocean?", answer: "Pacific" },
    { question: "Who wrote 'Romeo and Juliet'?", answer: "Shakespeare" },
    { question: "What year did the Titanic sink?", answer: "1912" },
  ];

  const [question, setQuestion] = useState(getRandomQuestion());
  const [inputAnswer, setInputAnswer] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  function getRandomQuestion() {
    return triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
  }

  const handleAnswerSubmit = () => {
    if (inputAnswer.trim().toLowerCase() === question.answer.toLowerCase()) {
      navigate("/gameboard", { state: { canPlay: true } });
    } else {
      setShowMessage(true);
      setNextPlayer();
    }
    setInputAnswer("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Answer the Trivia!</h1>

      <div style={styles.triviaBox}>
        <p style={styles.question}>{question.question}</p>
        <input
          style={styles.input}
          type="text"
          placeholder="Your answer"
          value={inputAnswer}
          onChange={(e) => setInputAnswer(e.target.value)}
        />
        <button style={styles.button} onClick={handleAnswerSubmit}>
          Submit
        </button>
      </div>

      {showMessage && (
        <div style={styles.messageOverlay}>
          <div style={styles.messageBox}>
            <h3>Wrong Answer!</h3>
            <p>Next Player's Turn.</p>
            <button style={styles.button} onClick={() => setShowMessage(false)}>
              Close
            </button>
          </div>
        </div>
      )}
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
    background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)", // Consistent with GameBoard
    color: "#102a43",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "600",
    marginBottom: "20px",
    textAlign: "center",
    color: "#102a43",
  },
  triviaBox: {
    backgroundColor: "#f7fafc", // Light gray to match the GameBoard style
    padding: "20px 30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
    width: "350px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  question: {
    fontSize: "1.2rem",
    fontWeight: "500",
    marginBottom: "15px",
    textAlign: "center",
    color: "#334e68",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    textAlign: "center",
    color: "#334e68",
    backgroundColor: "#fff",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#627d98",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease-in-out",
  },
  messageOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  messageBox: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
};

export default TriviaScreen;
