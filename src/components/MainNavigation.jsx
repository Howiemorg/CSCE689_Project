import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

const MainNavigation = () => {
  return (
    <>
      <div
        as="nav"
        className="bg-black-white text-white-black justify-center relative"
      >
        <>
          <div className="inset-y-0 flex items-center md:mr-20">
            <NavLink
              to="/"
              className="rounded-md p-2 transiton ease-in-out duration-300 border-0 hover:border-4 border-white-black"
              media="prefers-color-scheme:dark"
            >
              <h1>LLM Educate</h1>
            </NavLink>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="flex">
              <SearchBar />
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default MainNavigation;
