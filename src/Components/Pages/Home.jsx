import React from "react";
import Navbar from "../Navbar/Navbar";
import LeftSide from "../LeftSidebar/LeftSide";
import RightSide from "../RightSidebar/RightSide";
import CardSection from "../Main/CardSection";
import Main from "../Main/Main";

const Home = () => {
  return (
    <div className="w-full">
      <div className="fixed top-0 z-10 w-full bg-white">
        <Navbar></Navbar>
      </div>

      <div className="flex bg-gray-100">
        <div className="flex-auto w-[20%] fixed top-12 h-full ">
          <LeftSide></LeftSide>
        </div>

        <div className="flex-auto w-[60%] absolute left-[20%] top-10 bg-gray-100 rounded-xl">
          <div className="w-[90%] mx-auto">
            <CardSection></CardSection>
            <Main></Main>
          </div>
        </div>

        <div className="flex-auto w-[20%] fixed right-0 top-12">
          <RightSide></RightSide>
        </div>
      </div>
    </div>
  );
};

export default Home;
