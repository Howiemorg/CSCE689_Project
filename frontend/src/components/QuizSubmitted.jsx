import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import generateCodeQuiz from "../utils/LLM/generateQuiz";

const QuizSubmitted = ({
  quiz,
  selectedAnswers,
}) => {
  const navigate = useNavigate();
  const n = quiz.questions.length;
  const score = selectedAnswers.reduce(
    (accumulator, curVal, index) =>
      accumulator + ((curVal === quiz.questions[index].answer) / n) * 100,
    0
  );
  const [generating, setGenerating] = useState(false);

  return (
    <div>
      <div className="flex flex-row justify-evenly">
        <NavLink
          to="/quizzes"
          className="py-2 px-8 hover:bg-black  hover:text-white border-black border-2 rounded-md"
        >
          Go back to the quiz selection
        </NavLink>
        <div className="text-center ">
          <h1>
            Here's your results! (You can generate a similar question at the
            bottom)
          </h1>
          <p>You got {score}% correct</p>
        </div>
        <button
          className="p-2 border-black border-2 rounded-lg flex"
          onClick={async () => {
            setGenerating(true);
            await generateCodeQuiz([quiz], navigate);
            setGenerating(false);
          }}
          disabled={generating}
        >
          Generate Similar Quiz{" "}
          <p className={`ml-3 ${generating && "animate-spin"}`}>
            <ArrowPathIcon height={25} width={25} />
          </p>
        </button>
      </div>
      <div className="space-y-7 mt-4">
        {selectedAnswers.map((selectedAnswer, index) => {
          const question = quiz.questions[index];

          return (
            <div
              className="border-gray-500 border rounded-xl mx-auto p-4 w-4/6"
              key={question.question}
            >
              <p>{question.question}</p>
              <div className="flex flex-col space-y-7 mt-6">
                {question.choices.map((choice) => (
                  <div key={choice}>
                    <input
                      type="radio"
                      id={choice}
                      value={choice}
                      checked={
                        selectedAnswer === choice || choice === question.answer
                      }
                      //   disabled={choice !== question.answer}
                      readOnly
                      className={`w-2 h-2 rounded-full checked:border-2 appearance-none 
              ring-2 ring-offset-2 
              ${
                choice === question.answer
                  ? "bg-green-500 border-green-500 ring-green-500"
                  : "checked:bg-gray-500 checked:border-gray-500 ring-gray-500"
              } 
              peer-disabled:opacity-50`}
                    />
                    <label htmlFor={choice} className="ml-3">
                      {choice}
                      {choice === question.answer
                        ? "  (Correct Answer)"
                        : choice === selectedAnswer && "  (Your Answer)"}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizSubmitted;
