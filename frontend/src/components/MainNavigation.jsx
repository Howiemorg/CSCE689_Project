import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
// import SearchBar from "./SearchBar";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { logout } from "../store/Users/user-actions";
import { useDispatch, useSelector } from "react-redux";

const MainNavigation = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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

    return () => window.removeEventListener("click", closeDropDown);
  }, [openDropDown]);

  return (
    <>
      <div className="bg-black-white text-white-black flex justify-between items-center">
        <div className="flex items-center flex-grow-0">
          <NavLink
            to="/"
            className="border-2 border-black hover:bg-black hover:text-white rounded-md py-2 px-4 my-2 mx-3"
          >
            LLM Educate
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
            <div className="flex-col flex border-2 border-black z-20 absolute bg-white top-11 rounded-lg right-0 text-center">
              {userInfo ? (
                <>
                <p className="px-2 py-2">{userInfo.email}</p>
                  <button
                    className="py-2 px-4 hover:bg-black hover:text-white"
                    onClick={() => dispatch(logout())}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MainNavigation;
