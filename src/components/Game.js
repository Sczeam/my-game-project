import React, { useState, useEffect } from "react";
import quizData from "../quizData.json";

const Game = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(10); // Timer in seconds
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    // Fetch question data from quizData
    if (questionIndex < quizData.length) {
      const currentQuestion = quizData[questionIndex];
      setQuestion(currentQuestion.question);
      setOptions(currentQuestion.options);
      setSelectedOption("");
      setIsAnswered(false);
      setTimer(10); // Reset timer
    } else {
      // All questions answered
      console.log("Quiz completed");
    }
  }, [questionIndex]);

  useEffect(() => {
    // Start the timer countdown
    const interval = setInterval(() => {
      if (timer > 0 && !isAnswered) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        // Timer has expired or question answered
        clearInterval(interval);
        // Handle timer expiry logic (e.g., show correct answer)
        setIsAnswered(true);
      }
    }, 1000);

    // Clean up timer interval on component unmount or timer expiry
    return () => clearInterval(interval);
  }, [timer, isAnswered]);

  const handleOptionSelect = (option) => {
    // Handle option selection
    if (!isAnswered) {
      setSelectedOption(option);
      const currentQuestion = quizData[questionIndex];
      if (option === currentQuestion.correctAnswer) {
        const earningsFromQuestion = calculateEarnings(
          currentQuestion.difficulty
        );
        setEarnings((prevEarnings) => prevEarnings + earningsFromQuestion);
      } else {
        // Handle incorrect answer (e.g., deduct earnings or game over)
        // For now, let's just move to the next question
      }
      setIsAnswered(true);
      // Move to the next question after a delay
      setTimeout(() => {
        setQuestionIndex((prevIndex) => prevIndex + 1);
      }, 2000); // Adjust the delay as needed
    }
  };

  const calculateEarnings = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return 100;
      case "medium":
        return 200;
      case "hard":
        return 300;
      default:
        return 0;
    }
  };

  return (
    <div>
      <h2>Question: {question}</h2>
      <p>Time remaining: {timer} seconds</p>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <button
              disabled={isAnswered}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      {isAnswered && (
        <div>
          <p>Your answer: {selectedOption}</p>
          <p>Earnings: ${earnings}</p>
        </div>
      )}
    </div>
  );
};

export default Game;
