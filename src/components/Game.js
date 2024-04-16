// Game.js
import React, { useState, useEffect } from "react";
import quizData from "../quizData.json";
import BackgroundMusic from "./BackgroundMusic";

const Game = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(10); // Timer duration in seconds

  useEffect(() => {
    setAllQuestions(quizData);
  }, []);

  useEffect(() => {
    if (allQuestions.length > 0) {
      selectRandomQuestion();
      startTimer();
    }
  }, [allQuestions]);

  useEffect(() => {
    if (timerSeconds === 0) {
      setGameOver(true);
    }
  }, [timerSeconds]);

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimerSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  };

  const selectRandomQuestion = () => {
    const availableQuestions = allQuestions.filter(
      (question) => !askedQuestions.includes(question)
    );
    if (availableQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const selectedQuestion = availableQuestions[randomIndex];
      setCurrentQuestion(selectedQuestion);
      setAskedQuestions([...askedQuestions, selectedQuestion]);
    } else {
      // All questions have been asked, reset askedQuestions array
      setAskedQuestions([]);
    }
  };

  const handleAnswer = (selectedOption) => {
    if (selectedOption === currentQuestion.correctAnswer) {
      const newTotalEarnings = totalEarnings + currentQuestion.reward;
      setTotalEarnings(newTotalEarnings);
      selectRandomQuestion();
      setTimerSeconds(10); // Reset timer
    } else {
      setTotalEarnings(Math.max(totalEarnings - currentQuestion.reward, 0)); // Deduct earnings for wrong answer
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setTotalEarnings(0);
    setAskedQuestions([]);
    setGameOver(false);
    setCurrentQuestion(null);
    setTimerSeconds(10);
    selectRandomQuestion();
  };

  return (
    <div className="game">
      {gameOver ? (
        <div>
          <h2>Game Over!</h2>
          <p>Total Earnings: {totalEarnings}</p>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      ) : (
        currentQuestion && (
          <div>
            <BackgroundMusic />
            <h2>Question: {currentQuestion.question}</h2>
            <ul>
              {currentQuestion.options.map((option, index) => (
                <li key={index} onClick={() => handleAnswer(option)}>
                  {option}
                </li>
              ))}
            </ul>
            <p>Difficulty: {currentQuestion.difficulty}</p>
            <p>Reward: {currentQuestion.reward}</p>
            <p>Total Earnings: {totalEarnings}</p>
            <p>Time Remaining: {timerSeconds} seconds</p>
          </div>
        )
      )}
    </div>
  );
};

export default Game;
