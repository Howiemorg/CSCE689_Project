import React from "react";
import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";
import QuestionWindow from "../components/QuestionWindow";

const Layout = (props) => {
  return (
    <div className=" flex-col h-full">
      <MainNavigation />
      <div className="text-black-white bg-white-black tracking-tight p-2 h-72">
        <QuestionWindow />
      </div>
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
