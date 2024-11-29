import React from "react";
import { NavLink, Outlet, useParams, useRouteLoaderData } from "react-router-dom";

const Quizzes = () => {
  const quizzes = useRouteLoaderData("quizzes");
  const { topicId } = useParams();

  return (
    <div className="flex flex-col text-center mt-12">
      <h1 className="text-3xl">Coding Quizzes {topicId && `for ${topicId}`}</h1>
      <div className="flex mx-36 flex-col">
        {quizzes.map((quizz) => (
          <NavLink key={quizz.title} to={`/quiz/${quizz.title}`} state={quizz} className="flex flex-row content-between justify-between py-2 px-8 hover:bg-black  hover:text-white border-black border-2 rounded-md mt-12">
            <p>{quizz.title}</p>
            <p>{quizz.difficulty}</p>
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Quizzes;

const loadQuizzes = async (topic) => {
  const response = await fetch("/database.json");

  if (!response.ok || response.status !== 200) {
    throw new Response(JSON.stringify("Could not fetch quizzes."), {
      headers: {
        "Content-Type": "application/json; utf-8",
      },
      status: 500,
    });
  }

  const json = await response.json();

  if (!topic) {
    return json.quizzes;
  }

  const quizzes = json.quizzes.filter(
    (question) => question.topic === topic
  );
  return quizzes;
};

export const loader = async ({ request, params }) => {
  return await loadQuizzes(params.topicId);
};
