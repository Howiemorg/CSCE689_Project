import React from "react";
import { NavLink } from "react-router-dom";

const ChooseQuestion = () => {
  return (
    <div className="flex flex-col text-center mt-12">
      <h1 className="text-3xl">Choose a Question Type</h1>
      <div className="flex flex-row justify-evenly text-xl text-center mt-16" >
        <NavLink
          to={"/questions"}
          className="h-72 p-3 py-12 rounded-lg m-3 place-content-center border-black border-2 hover:bg-black hover:text-white"
        >
          <p>Practical</p>
          <p>(Coding/Technical Questions with an IDE)</p>
        </NavLink>
        <NavLink
          to={"/quizzes"}
          className="h-72 p-3 py-12 rounded-lg m-3 place-content-center border-black border-2 hover:bg-black hover:text-white"
        >
          <p>Conceptual</p>
          <p>(Quizzes on Data Structures and Algorithms)</p>
        </NavLink>
      </div>
    </div>
  );
};

export default ChooseQuestion;
