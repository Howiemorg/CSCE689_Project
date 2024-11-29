import React from "react";
import { NavLink, Outlet, useParams, useRouteLoaderData } from "react-router-dom";

const Questions = () => {
  const questions = useRouteLoaderData("questions");
  const { topicId } = useParams();

  return (
    <div className="flex flex-col text-center mt-12">
      <h1 className="text-3xl">Coding Questions {topicId && `for {topicId}`}</h1>
      <div className="flex mx-36 flex-col">
        {questions.map((question) => (
          <NavLink key={question.title} to={`/question/${question.title}`} state={question} className="flex flex-row content-between justify-between py-2 px-8 hover:bg-black  hover:text-white border-black border-2 rounded-md mt-12">
            <p>{question.title}</p>
            <p>{question.difficulty}</p>
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Questions;

const loadQuestions = async (topic) => {
  const response = await fetch("/database.json");

  if (!response.ok || response.status !== 200) {
    throw new Response(JSON.stringify("Could not fetch questions."), {
      headers: {
        "Content-Type": "application/json; utf-8",
      },
      status: 500,
    });
  }

  const json = await response.json();

  if (!topic) {
    return json.questions;
  }

  const questions = json.questions.filter(
    (question) => question.topic === topic
  );
  return questions;
};

export const loader = async ({ request, params }) => {
  return await loadQuestions(params.topicId);
};
