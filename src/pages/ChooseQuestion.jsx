import React from "react";
import { NavLink, useParams } from "react-router-dom";

const ChooseQuestion = () => {
  const { topicId } = useParams();

  return (
    <div className="flex flex-col text-center mt-12">
      <div className="flex-row flex justify-evenly">
        <h1 className="text-3xl">Choose a Question Type</h1>
        <div className="flex justify-center items-center">
          <hr className="flex border-b-2 border-black w-20" />
          <span className="text-3xl whitespace-nowrap mx-1">or</span>
          <hr className="flex border-b-2 border-black w-24" />
        </div>
        <h2 className="text-3xl">Get Study Material</h2>
      </div>
      <div className="flex flex-row justify-evenly text-xl text-center mt-16">
        <NavLink
          to={`/questions/${topicId}`}
          className="h-72 p-3 py-12 rounded-lg m-3 place-content-center border-black border-2 hover:bg-black hover:text-white"
        >
          <p>Practical</p>
          <p>(Coding/Technical Questions with an IDE)</p>
        </NavLink>
        <NavLink
          to={`/quizzes/${topicId}`}
          className="h-72 p-3 py-12 rounded-lg m-3 place-content-center border-black border-2 hover:bg-black hover:text-white"
        >
          <p>Conceptual</p>
          <p>(Quizzes on Data Structures and Algorithms)</p>
        </NavLink>
        <NavLink
          to={`/study/${topicId}`}
          className="h-72 p-3 py-12 rounded-lg m-3 place-content-center border-black border-2 hover:bg-black hover:text-white"
        >
          <p>Get Recommended Study Material</p>
        </NavLink>
      </div>
    </div>
  );
};

export default ChooseQuestion;
