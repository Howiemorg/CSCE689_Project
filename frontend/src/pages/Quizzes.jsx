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
  const response = topic ? await fetch(`http://localhost:8000/quizzes/getByTopic/${topic}`) : await fetch(`http://localhost:8000/quizzes/getAll`);
  const json = await response.json();

  if (!response.ok || response.status !== 200) {
    throw new Response(json.error, {
      headers: {
        "Content-Type": "application/json; utf-8",
      },
      status: 500,
    });
  }

  return json.quizzes;
};

export const loader = async ({ request, params }) => {
  return await loadQuizzes(params.topicId);
};
