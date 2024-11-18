import React from "react";
import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";

const Layout = (props) => {
  return (
    <div className=" flex-col">
      <MainNavigation />
      <h1 className="text-black-white bg-white-black text-center text-4xl font-bold font-[Georgia] tracking-tight sm:text-6xl pt-20">
        LLM Educate
      </h1>
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
