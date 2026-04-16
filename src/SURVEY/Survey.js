import React, { useState } from "react";
import questions from "./questions.js";

export default function Survey() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[questionIndex];

  const handleAnswerChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    let nextIndex = questionIndex + 1;
    while (nextIndex < questions.length) {
      const nextQuestion = questions[nextIndex];
      if (!nextQuestion.showIf || nextQuestion.showIf(answers)) {
        break;
      }
      nextIndex++;
    }
    if (nextIndex < questions.length) {
      setQuestionIndex(nextIndex);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    let prevIndex = questionIndex - 1;
    while (prevIndex >= 0) {
      const prevQuestion = questions[prevIndex];
      if (!prevQuestion.showIf || prevQuestion.showIf(answers)) {
        break;
      }
      prevIndex--;
    }
    if (prevIndex >= 0) {
      setQuestionIndex(prevIndex);
    }
  };

  if (isComplete) {
    return (
      <div>
        <h2>Survey Complete</h2>
        <pre>{JSON.stringify(answers, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div
      style={{ maxWidth: "500px", margin: "40px auto", fontFamily: "Arial" }}
    >
      <div style={{ marginBottom: "20px" }}>
        <p>
          <strong>
            Question {questionIndex + 1} of {questions.length}
          </strong>
        </p>
        <p>{currentQuestion.text}</p>

        {currentQuestion.type === "text" && (
          <input
            type="text"
            value={answers[currentQuestion.id] || ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
            style={{ padding: "8px", width: "100%" }}
          />
        )}

        {currentQuestion.type === "radio" && (
          <div>
            {currentQuestion.options.map((option) => (
              <label
                key={option}
                style={{ display: "block", marginBottom: "8px" }}
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option}
                  checked={answers[currentQuestion.id] === option}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                />{" "}
                {option}
              </label>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
        <button
          onClick={handlePrevious}
          disabled={questionIndex === 0}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: questionIndex === 0 ? "#f3f4f6" : "#fff",
            color: "#333",
            cursor: questionIndex === 0 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion.id]}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: !answers[currentQuestion.id]
              ? "#9ca3af"
              : "#2563eb",
            color: "#fff",
            cursor: !answers[currentQuestion.id] ? "not-allowed" : "pointer",
            fontWeight: "500",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
