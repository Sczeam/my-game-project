import React, { useState, useEffect } from "react";

const QuestionScreen = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [timer, setTimer] = useState(10); // Timer in seconds
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);

  // Dummy question data for demonstration
  const dummyQuestion = "What is the capital of France?";
  const dummyOptions = ["Paris", "London", "Berlin", "Madrid"];

  useEffect(() => {
    // Fetch question and options from API or local data source
    setQuestion(dummyQuestion);
    setOptions(dummyOptions);
  }, []);

  useEffect(() => {
    // Start the timer countdown
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        // Timer has expired
        clearInterval(interval);
        // Handle timer expiry logic (e.g., show correct answer, mark as unanswered)
        setIsAnswered(true);
      }
    }, 1000);

    // Clean up timer interval on component unmount or timer expiry
    return () => clearInterval(interval);
  }, [timer]);

  const handleOptionSelect = (option) => {
    // Handle option selection
    if (!isAnswered) {
      setSelectedOption(option);
      // Perform additional logic (e.g., check answer)
      setIsAnswered(true);
      // Optionally, you can also clear the timer here
    }
  };

  return (
    <div>
      <h2>Question: {question}</h2>
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
      <p>Time remaining: {timer} seconds</p>
      {isAnswered && <p>Answered: {selectedOption}</p>}
      {/* Additional UI based on whether the question is answered or timer is expired */}
    </div>
  );
};

export default QuestionScreen;
