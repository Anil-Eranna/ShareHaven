import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import LeftSide from "../LeftSidebar/LeftSide";
import RightSide from "../RightSidebar/RightSide";
import Main from "../Main/Main";
import profilePic from "../../assets/images/profilePic.jpg";
import Avatar from "../Navbar/Tooltip/Avatar";
import avatar from "../../assets/images/avatar.jpg";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useParams } from "react-router-dom";

const FriendProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      const q = query(collection(db, "users"), where("uid", "==", id));
      await onSnapshot(q, (doc) => {
        setProfile(doc.docs[0].data());
      });
    };
    getUserProfile();
  }, [id]);

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
            <div>
              <div className="relative py-4">
                <img
                  className="h-96 w-full rounded-md"
                  src={profilePic}
                  alt="profilePic"
                ></img>
                <div className="absolute bottom-10 left-6">
                  <Avatar
                    size={20}
                    src={profile?.image || avatar}
                    alt="avatar"
                  ></Avatar>
                  <p className="py-2 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
                    {profile?.email}
                  </p>
                  <p className="py-2 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
                    {profile?.name}
                  </p>
                </div>
                <div className="flex flex-col absolute right-6 bottom-10">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#fff"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>

                    <span className="ml-2 py-2 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
                      From India, Karnataka
                    </span>
                  </div>

                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                      />
                    </svg>

                    <span className="ml-2 py-2 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
                      Lives in Bengaluru
                    </span>
                  </div>
                </div>
              </div>
            </div>
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

export default FriendProfile;
