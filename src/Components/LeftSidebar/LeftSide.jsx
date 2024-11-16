import React, { useState, useEffect, useRef, useContext} from "react";
import nature from "../../assets/images/nature.jpg";
import Tooltip from "../Navbar/Tooltip/Tooltip";
import Avatar from "../Navbar/Tooltip/Avatar";
import avatar from "../../assets/images/avatar.jpg";
import job from "../../assets/images/job.png";
import location from "../../assets/images/location.png";
import facebook from "../../assets/images/facebook.png";
import twitter from "../../assets/images/twitter.png";
import laptop from "../../assets/images/laptop.jpg";
import media from "../../assets/images/media.jpg";
import apps from "../../assets/images/media.jpg";
import tik from "../../assets/images/tik.jpg";
import { AuthContext } from "../AppContext/AppContext";

const LeftSide = () => {
  const [data, setData] = useState([]);
  const count = useRef(0);
  const { user, userData }  = useContext(AuthContext);

  const handleRandom = (arr) => {
    setData(arr[Math.floor(Math.random() * arr?.length)]);
  };

  useEffect(() => {
    const imageList = [
      {
        id: "1",
        image: laptop,
      },

      {
        id: "2",
        image: media,
      },

      {
        id: "3",
        image: apps,
      },

      {
        id: "4",
        image: tik,
      },
    ];
    
    handleRandom(imageList);
    let countAds = 0;
    let startAds = setInterval(() => {
      countAds++;
      handleRandom(imageList);
      count.current = countAds;
      if (countAds === 5) {
        clearInterval(startAds);
      }
    }, 8000);

    return () => {
      clearInterval(startAds);
    };
  }, []);

  const progressBar = () => {
    switch (count.current) {
      case 1:
        return 20;

      case 2:
        return 40;

      case 3:
        return 60;

      case 4:
        return 80;

      case 5:
        return 100;

      default:
        return 0;
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white pb-4 border-2 rounded-r-xl shadow-lg">
      <div className="flex flex-col items-center relative">
        <img
          className="h-28 w-full rounded-r-xl"
          src={nature}
          alt="nature"
        ></img>
        <div className="absolute -bottom-4">
          <Tooltip content="Profile" placement="top">
            <Avatar src={user?.photoURL || avatar} alt="avatar" size={40}></Avatar>
          </Tooltip>
        </div>
      </div>

      <div className="flex flex-col items-center pt-6">
        <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
          {user?.email || userData?.email}
        </p>

        <p className="font-roboto font-medium text-xs text-gray-700 no-underline tracking-normal leading-none">
          {/* Access exclusive tools & insights */}
        </p>

        <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none py-2">
          Try premium for free
        </p>
      </div>

      <div className="flex flex-col pl-2">
        <div className="flex items-center">
          <img className="h-6" src={location} alt="location"></img>
          <p className="font-roboto font-bold text-md no-underline tracking-normal leading-none ml-2">
            India
            </p>
        </div>

        <div className="flex items-center pb-1">
          <img className="h-6" src={job} alt="job"></img>
          <p className="font-roboto font-bold text-md no-underline tracking-normal leading-none ml-2">
            React Developer
            </p>
        </div>

        <div className="flex justify-center items-center pt-2">
          <p className="font-roboto font-bold text-sm text-[#0177b7] no-underline tracking-normal leading-none">
            Events
          </p>

          <p className="font-roboto font-bold text-sm text-[#0177b7] no-underline tracking-normal leading-none mx-2">
            Groups
          </p>

          <p className="font-roboto font-bold text-sm text-[#0177b7] no-underline tracking-normal leading-none">
            Follow
          </p>

          <p className="font-roboto font-bold text-sm text-[#0177b7] no-underline tracking-normal leading-none mx-2">
            More
          </p>
        </div>
      </div>

      <div className="ml-2 pt-2">
        <p className="font-roboto font-bold text-md no-underline tracking-normal leading-none py-2">
          Social Profiles
        </p>
        <div className="flex items-center">
          <img className="h-8 mb-1 mr-2" src={facebook} alt="facebook"></img>
          <p className="font-roboto font-bold text-md text-transparent bg-clip-text bg-gradient-to-r to-red-700 from-blue-500 no-underline tracking-normal leading-none py-2">
            Social Network
          </p>
        </div>

        <div className="flex items-center">
          <img className="h-8 mb-1 mr-2" src={twitter} alt="twitter"></img>
          <p className="font-roboto font-bold text-md text-transparent bg-clip-text bg-gradient-to-r to-red-700 from-blue-500 no-underline tracking-normal leading-none py-2">
            Social Network
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <p className="font-roboto font-bold text-md no-underline tracking-normal leading-none py-2">
          Random Ads
        </p>
        <div style={{width: `${progressBar()}%`}}className="bg-blue-600 rounded-xl h-1 mb-1"></div>
        <img className="h-28 rounded-lg" src={data.image} alt="ads"></img>
      </div>
    </div>
  );
};

export default LeftSide;
        
