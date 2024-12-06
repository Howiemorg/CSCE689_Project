import React, { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import usePagination from "../hooks/usePagination";
import { useSelector } from "react-redux";

const Quizzes = () => {
  const { topicId } = useParams();
  const loadedQuizzes = useRouteLoaderData("quizzes");
  const { userInfo }= useSelector((state) => state.user)
  const url = topicId
    ? `http://localhost:8000/quizzes/getByTopic/${topicId}?${userInfo ? `email=${userInfo.email}&` : ""}`
    : `http://localhost:8000/quizzes/getAll?${userInfo ? `email=${userInfo.email}&` : ""}`;
  const [quizzes, setQuizzes] = useState([]);
  const {
    page,
    maxPages,
    prevPage,
    nextPage,
    firstPage,
    lastPage,
    getContent,
  } = usePagination(url, -1);


  const getPaginatedContent = async () => {
    const json = await getContent();
    if (json.quizzes) {
      setQuizzes(json.quizzes);
    }
  };
  console.log(quizzes);

  useEffect(() => {
    getPaginatedContent()
  }, [page])

  return (
    <div className="flex flex-col text-center mt-12">
      <h1 className="text-3xl">Coding Quizzes {topicId && `for ${topicId}`}</h1>
      <div className="flex mx-36 flex-col">
        {quizzes.map((quiz) => (
          <NavLink
            key={quiz.title}
            to={`/quiz/${quiz.title}`}
            state={quiz}
            className="flex flex-row py-2 px-8 hover:bg-black  hover:text-white border-black border-2 rounded-md mt-12"
          >
            <p className="text-start basis-2/5">{quiz.title}</p>
            <p className="">{quiz.solved ? "Complete!" : "Incomplete"}</p>
            <p className="ml-auto">{quiz.difficulty}</p>
          </NavLink>
        ))}
      </div>
      <div className=" mt-12 space-x-5">
        <button
          className="py-2 px-8 hover:bg-black  hover:text-white border-black border-2 rounded-md"
          onClick={async () => {
            if (page !== 0) {
              firstPage();
            }
          }}
        >
          First
        </button>
        <button
          className="py-2 px-8 hover:bg-black  hover:text-white border-black border-2 rounded-md"
          onClick={async () => {
            if (page !== 0) {
              prevPage();
            }
          }}
        >
          Prev
        </button>
        <button
          className="py-2 px-8 hover:bg-black  hover:text-white border-black border-2 rounded-md"
          onClick={async () => {
            if (page !== maxPages) {
              nextPage();
            }
          }}
        >
          Next
        </button>
        <button
          className="py-2 px-8 hover:bg-black  hover:text-white border-black border-2 rounded-md"
          onClick={async () => {
            if (page !== maxPages) {
              lastPage();
            }
          }}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Quizzes;

const loadQuizzes = async (topic) => {
  const response = topic
    ? await fetch(
        `http://localhost:8000/quizzes/getByTopic/${topic}?limit=5&page=0`
      )
    : await fetch(`http://localhost:8000/quizzes/getAll?limit=5&page=0`);
  const json = await response.json();

  console.log("JSON QUIZZES:", json);

  if (!response.ok || response.status !== 200) {
    if(response.status === 404){
      return []
    }
    throw new Response(json.error, {
      headers: {
        "Content-Type": "application/json; utf-8",
      },
      status: 500,
    });
  }

  return json;
};

export const loader = async ({ request, params }) => {
  return await loadQuizzes(params.topicId);
};
