import React, { useEffect, useMemo, useState } from "react";

import usePagination from "../hooks/usePagination";
import { useLocation } from "react-router-dom";
import QuizSubmitted from "../components/QuizSubmitted";

const Quiz = () => {
  const location = useLocation();
  const quiz = useMemo(() => location.state || {}, [location.state]);

  const { nextPage, firstPage, page, setMaxPages } = usePagination(
    "",
    quiz.questions.length
  );

  const question = quiz.questions[page];
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  console.log("PAGE:", page)
  console.log("QUIZ", quiz)
  console.log("QUESTION:", question)

  useEffect(() => {
    setSelectedAnswers([]);
    setSelectedAnswer("");
    firstPage(); 
    setMaxPages(quiz.questions.length);
  }, [firstPage, quiz, setMaxPages, location.state]);

  return (
    <div className="m-10">
      {selectedAnswers.length === quiz.questions.length ? (
        <QuizSubmitted selectedAnswers={selectedAnswers} quiz={quiz} />
      ) : (
        <>
        <h1 className="text-xl text-center font-semibold mb-4">{quiz.title}</h1>
          <p>{question.question}</p>
          <div className="flex flex-col space-y-7 mt-6">
            {question.choices.map((choice) => (
              <div key={choice}>
                <input
                  type="radio"
                  id={choice}
                  name={question.question}
                  value={choice}
                  checked={selectedAnswer === choice}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                <label htmlFor={choice} className="ml-3">
                  {choice}
                </label>
              </div>
            ))}
          </div>
          <button
            className="ml-auto py-2 px-8 hover:bg-black  hover:text-white border-black border-2 rounded-md mt-12"
            disabled={selectedAnswer.length === 0}
            onClick={() => {
              nextPage();
              setSelectedAnswer("");
              setSelectedAnswers((prevSelectedAnswers) => [
                ...prevSelectedAnswers,
                selectedAnswer,
              ]);
            }}
          >
            {page === quiz.questions.length - 1 ? "Submit" : "Next Question"}
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;
