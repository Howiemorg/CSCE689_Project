import React, { useEffect, useState } from "react";
import {
  NavLink,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import usePagination from "../hooks/usePagination";
import { useSelector } from "react-redux";

const Questions = () => {
  const { topicId } = useParams();
  // const loadedQuestions = useRouteLoaderData("questions");
  const { userInfo }= useSelector((state) => state.user)
  const url = topicId
    ? `http://localhost:8000/questions/getByTopic/${topicId}?${userInfo ? `email=${userInfo.email}&` : ""}`
    : `http://localhost:8000/questions/getAll?${userInfo ? `email=${userInfo.email}&` : ""}`;
  const [questions, setQuestions] = useState([]);
  const {
    page,
    maxPages,
    prevPage,
    nextPage,
    firstPage,
    lastPage,
    getContent,
  } = usePagination(url,-1);

  const getPaginatedContent = async () => {
    const json = await getContent();
    if (json.questions) {
      setQuestions(json.questions);
    }
  };

  useEffect(() => {
    getPaginatedContent();
  }, [page]);

  return (
    <div className="flex flex-col text-center mt-12">
      <h1 className="text-3xl">
        Coding Questions {topicId && `for ${topicId}`}
      </h1>
      <div className="flex mx-36 flex-col">
        {questions.map((question) => (
          <NavLink
            key={question.title}
            to={`/question/${question.title}`}
            state={question}
            className="flex flex-row py-2 px-8 hover:bg-black  hover:text-white border-black border-2 rounded-md mt-12"
          >
            <p className="text-start basis-2/5">{question.title}</p>
            <p className="">{question.solved ? "Solved!" : "Unsolved"}</p>
            <p className="ml-auto">{question.difficulty}</p>
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
            console.log(page)
            console.log(maxPages)
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

export default Questions;

const loadQuestions = async (topic) => {
  const response = topic
    ? await fetch(`http://localhost:8000/questions/getByTopic/${topic}?limit=5&page=0`)
    : await fetch(`http://localhost:8000/questions/getAll?limit=5&page=0`);
  const json = await response.json();

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
  return await loadQuestions(params.topicId);
};
