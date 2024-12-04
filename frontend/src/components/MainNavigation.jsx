import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

const MainNavigation = () => {
  return (
    <>
      <div as="nav" className="bg-black-white text-white-black flex justify-between">
        <div className="flex items-center flex-grow-0">
          <NavLink
            to="/"
            className="rounded-md p-2 transiton ease-in-out duration-300 border-0 hover:border-4 border-white-black"
            media="prefers-color-scheme:dark"
          >
            <h1>LLM Educate</h1>
          </NavLink>
        </div>
        <div className="mx-auto flex-grow-0 ">
          <SearchBar />
        </div>
        <div className="flex-grow-0"></div>
      </div>
    </>
  );
};

export default MainNavigation;
