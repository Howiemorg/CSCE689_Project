import React, { useEffect, useMemo, useState } from "react";

import usePagination from "../hooks/usePagination";
import { useLocation } from "react-router-dom";
import QuizSubmitted from "../components/QuizSubmitted";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/Users/user-slice";

const Quiz = () => {
  const location = useLocation();
  const quiz = useMemo(() => location.state || {}, [location.state]);
  const { userInfo, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const { nextPage, firstPage, page, setMaxPages } = usePagination(
    "",
    quiz.questions.length
  );

  const question = quiz.questions[page];
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    setSelectedAnswers(quiz.solved ? Object.values(userInfo.solvedQuestions.find((solvedQuestion => solvedQuestion.questionId === quiz._id)).answers) : []);
    setSelectedAnswer("");
    firstPage();
    setMaxPages(quiz.questions.length);
  }, [firstPage, quiz, setMaxPages, location.state]);

  const sendSolvedQuestion = async () => {
    dispatch(userActions.userRequest());

    const body = {
      email: userInfo.email,
      questionId: quiz._id,
      question: "Quizzes",
      answers: [...selectedAnswers, selectedAnswer].reduce(
        (accumulator, answer, index) => {
          accumulator[index] = answer;
          return accumulator;
        },
        {}
      ),
    };
    try {
      const response = await fetch(
        "http://localhost:8000/users/questionSolved",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError("Error submitting quiz.");
        return false;
      }

      console.log(data)
      dispatch(userActions.userSuccess(data));
      return true;
    } catch (err) {
      setError("Error submitting quiz.");
      return false;
    }
  };

  return (
    <div className="m-10">
      {selectedAnswers.length === quiz.questions.length ? (
        <QuizSubmitted selectedAnswers={selectedAnswers} quiz={quiz} />
      ) : (
        <>
          <h1 className="text-xl text-center font-semibold mb-4">
            {quiz.title}
          </h1>
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
          {error && <p className="text-red text-center">{error}</p>}
          <button
            className="ml-auto py-2 px-8 hover:bg-black  hover:text-white border-black border-2 rounded-md mt-12"
            disabled={selectedAnswer.length === 0 || loading}
            onClick={async() => {
              setError("");
              if (userInfo && quiz._id && page === quiz.questions.length - 1) {
                dispatch(userActions.userRequest());
                const successfullySent = await sendSolvedQuestion();
                dispatch(userActions.userReset());
                if(!successfullySent) return;
              }
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
