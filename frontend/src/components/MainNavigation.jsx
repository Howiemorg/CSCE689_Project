import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
// import SearchBar from "./SearchBar";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const MainNavigation = () => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const dropDownRef = useRef(false);

  useEffect(() => {
    const closeDropDown = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpenDropDown(false);
      }
    };

    if (openDropDown) {
      window.addEventListener("click", closeDropDown);
    }

    // Cleanup listener when component unmounts
    return () => window.removeEventListener("click", closeDropDown);
  }, [openDropDown]);

  return (
    <>
      <div className="bg-black-white text-white-black flex justify-between items-center">
        <div className="flex items-center flex-grow-0">
          <NavLink
            to="/"
            className="rounded-md p-2 transiton ease-in-out duration-300 border-0 hover:border-4 border-white-black"
            media="prefers-color-scheme:dark"
          >
            <h1>LLM Educate</h1>
          </NavLink>
        </div>
        {/* <div className="mx-auto flex-grow-0 ">
          <SearchBar />
        </div> */}
        <div
          className="flex flex-col"
          ref={dropDownRef}
          onClick={() => {
            setOpenDropDown((prevOpen) => !prevOpen);
          }}
        >
          <UserCircleIcon className="w-8 h-8 mr-8 cursor-pointer" />
          {openDropDown && (
            <div
              hidden
              className="flex-col flex border-2 border-black z-20 absolute bg-white top-9 rounded-lg right-0 text-center"
            >
              <NavLink
                className="py-2 px-4 hover:bg-black hover:text-white"
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className="py-2 px-4 hover:bg-black hover:text-white"
                to="/signup"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MainNavigation;
