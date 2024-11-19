import React from "react";
import { NavLink, useMatch, useRouteLoaderData } from "react-router-dom";

const HomePage = (props) => {
  const homePage = useMatch("/");

  let topics = useRouteLoaderData(!homePage ? "topics" : "home");

  console.log(props);

  return (
    <div className="text-center mt-12">
      <h1 className="text-3xl">Choose a Topic</h1>
      <div className=" grid grid-cols-2 place-items-center">
        {topics.map((topic) => {
          return (
            <NavLink
              to={`/topics/${topic}`}
              key={topic}
              className="w-1/2 my-16 p-3 rounded-lg m-3 items-center text-center border-black border-2 hover:bg-black hover:text-white"
            >
              <p className="text-lg py-7 p-2 place-content-center ">{topic}</p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;

const loadTopics = async () => {
  const response = await fetch("/database.json");

  if (!response.ok || response.status !== 200) {
    throw new Response(JSON.stringify("Could not fetch topics."), {
      headers: {
        "Content-Type": "application/json; utf-8",
      },
      status: 500,
    });
  }

  const json = await response.json();
  return json.topics;
};

export const loader = async ({ request, params }) => {
  return await loadTopics();
};
