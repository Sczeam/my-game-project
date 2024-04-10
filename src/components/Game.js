import React, { useState, useEffect } from "react";
import quizData from "../quizData.json";

const Game = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(10); // Timer in seconds

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
      // Perform additional logic (e.g., check answer)
      setIsAnswered(true);
      // Optionally, you can also clear the timer here
    }
  };

  const handleNextQuestion = () => {
    // Move to the next question
    setQuestionIndex((prevIndex) => prevIndex + 1);
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
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      )}
    </div>
  );
};

export default Game;
