import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import waterslide from "../../assets/images/waterslide.jpg";
import { AuthContext } from "../AppContext/AppContext";
import Avatar from "../Navbar/Tooltip/Avatar";
import avatar from "../../assets/images/avatar.jpg";
import remove from "../../assets/images/delete.png";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const RightSide = () => {
  const [input, setInput] = useState("");
  const { user, userData } = useContext(AuthContext);
  const friendList = userData?.friends;

  const searchFriends = (data) => {
    return data.filter((item) =>
      item["name"].toLowerCase().includes(input.toLowerCase())
    );
  };

  const removeFriend = async (id, name, image) => {
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const getDoc = await getDocs(q);
    const userDocumentId = getDoc.docs[0].id;

    await updateDoc(doc(db, "users", userDocumentId), {
      friends: arrayRemove({ id: id, name: name, image: image }),
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white shadow-lg border-2 rounded-l-xl">
      <div className="flex flex-col items-center  relative pt-10">
        <img className="h-40 rounded-md" src={waterslide} alt="nature"></img>
      </div>
      <p className="font-roboto font-normal text-sm text-gray-700 max-w-fit no-underline tracking-normal leading-tight py-2 mx-2">
        Through photography , the beauty of Mother Nature can be frozen in time.
        This category celebrates the magic of our planet and beyond - from the
        immensity of the great outdoors, to miraculous moments in your own
        backyard.
      </p>

      <div className="mx-2 mt-4">
        <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
          Friends:{" "}
        </p>
        <input
          className="border-0 outline-none mt-2"
          type="text"
          name="input"
          value={input}
          placeholder="Search friends"
          onChange={(e) => setInput(e.target.value)}
        ></input>

        {friendList?.length > 0 ? (
          searchFriends(friendList)?.map((friend) => {
            return (
              <div
                className="flex items-center justify-between hover:bg-gray-100 duration-300 ease-in-out"
                key={friend.id}
              >
                <Link to={`/profile/${friend.id}`}>
                  <div className="flex items-center my-2 cursor-pointer">
                    <div className="flex items-center">
                      <Avatar
                        src={friend?.image || avatar}
                        size={20}
                        alt="avatar"
                      ></Avatar>
                      <p className="ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                        {friend.name}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="mr-4">
                  <img
                    className="cursor-pointer"
                    src={remove}
                    alt="deleteFriend"
                    onClick={() => removeFriend(friend.id, friend.name, friend.image)}
                  ></img>
                </div>
              </div>
            );
          })
        ) : (
          <p className="mt-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
            Add friends to check their profile
          </p>
        )}
      </div>
    </div>
  );
};

export default RightSide;
