import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useReducer,
} from "react";
import Avatar from "../Navbar/Tooltip/Avatar";
import avatar from "../../assets/images/avatar.jpg";
import live from "../../assets/images/live.png";
import smile from "../../assets/images/smile.png";
import addImage from "../../assets/images/add-image.png";
import { AuthContext } from "../AppContext/AppContext";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  postsReducer,
  postActions,
  postsStatus,
} from "../AppContext/PostReducer";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import PostCard from "./PostCard";

const Main = () => {
  const { user, userData } = useContext(AuthContext);
  const text = useRef("");
  const scrollRef = useRef("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const collectionRef = collection(db, "posts");
  const postRef = doc(collection(db, "posts"));
  const document = postRef.id;
  const [state, dispatch] = useReducer(postsReducer, postsStatus);
  const { SUBMIT_POST, HANDLE_ERROR } = postActions;
  const [progressBar, setProgressBar] = useState(0);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  // const handleSubmitPost = async (e) => {
  //   e.preventDefault();
  //   if (text.current.value !== "") {
  //     try {
  //       await setDoc(postRef, {
  //         documentId: document,
  //         uid: user?.uid || userData?.uid,
  //         logo: user?.photoURL,
  //         name: user?.displayName || userData?.name,
  //         email: user?.email || userData?.email,
  //         text: text.current.value,
  //         image: image,
  //         timestamp: serverTimestamp(),
  //       });
  //       text.current.value = "";
  //     } catch (err) {
  //       dispatch({ type: HANDLE_ERROR });
  //       alert(err.message);
  //       console.log(err.message);
  //     }
  //   } else {
  //     dispatch({ type: HANDLE_ERROR });
  //   }
  // };

  // Handle submitting the post (to local storage)
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (text.current.value !== "") {
      try {
        const postData = {
          documentId: Date.now().toString(), // Using timestamp as a unique ID
          uid: user?.uid || userData?.uid,
          logo: user?.photoURL,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          text: text.current.value,
          image: image,
          timestamp: new Date().toISOString(), // Save timestamp in ISO format
        };

        // Get existing posts from localStorage
        const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
        // Add the new post
        existingPosts.push(postData);
        // Save back to localStorage
        localStorage.setItem("posts", JSON.stringify(existingPosts));

        // Reset form and state
        text.current.value = "";
        setImage(null);
        setFile(null);
        setProgressBar(0);

        // Dispatch to update state
        dispatch({ type: SUBMIT_POST, posts: existingPosts });
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    } else {
      dispatch({ type: HANDLE_ERROR });
    }
  };

  const storage = getStorage();

  const metadata = {
    contentType: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ],
  };

  // const submitImage = async () => {
  //   const fileType = metadata.contentType.includes(file["type"]);
  //   console.log("file", file);
  //   if (!file) return;
  //   if (fileType) {
  //     try {
  //       const storageRef = ref(storage, `image/${file.name}`);
  //       const uploadTask = uploadBytesResumable(
  //         storageRef,
  //         file,
  //         metadata.contentType
  //       );
  //       await uploadTask.on(
  //         "state_changed",
  //         (snapshot) => {
  //           const progress = Math.round(
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //           );
  //           setProgressBar(progress);
  //         },
  //         (error) => {
  //           alert(error);
  //         },
  //         async () => {
  //           await getDownloadURL(uploadTask.snapshot.ref).then(
  //             (downloadURL) => {
  //               setImage(downloadURL);
  //             }
  //           );
  //         }
  //       );
  //     } catch (err) {
  //       dispatch({ type: HANDLE_ERROR });
  //       alert(err.message);
  //       console.log(err.message);
  //     }
  //   }
  // };

  // Handle image upload (similar to before)
  const submitImage = async () => {
    if (!file) return;

    const fileType = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg+xml"].includes(file.type);
    if (fileType) {
      try {
        // Simulate file upload (without Firebase)
        setProgressBar(50); // Fake upload progress

        // Simulate getting image URL (in a real app, you would upload to cloud storage and get the URL)
        setTimeout(() => {
          setProgressBar(100);
          setImage(URL.createObjectURL(file)); // Using local URL as an example
        }, 2000);
      } catch (err) {
        alert(err.message);
        console.log(err.message);
      }
    }
  };

  // Fetch posts from localStorage on component mount
  useEffect(() => {
    const postsFromLocalStorage = JSON.parse(localStorage.getItem("posts")) || [];
    dispatch({ type: SUBMIT_POST, posts: postsFromLocalStorage });
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [SUBMIT_POST]);

  // useEffect(() => {
  //   const postData = async () => {
  //     const q = query(collectionRef, orderBy("timestamp", "asc"));
  //     await onSnapshot(q, (doc) => {
  //       dispatch({
  //         type: SUBMIT_POST,
  //         posts: doc?.docs?.map((item) => item?.data()),
  //       });
  //       scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  //       setImage(null);
  //       setFile(null);
  //       setProgressBar(0);
  //     });
  //   };
  //   return () => postData();
  // }, [SUBMIT_POST]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col py-2 w-full bg-white rounded-3xl shadow-lg">
        <div className="flex items-center border-b-2 border-gray-300 pb-2 pl-4 w-full">
          <Avatar
            size={30}
            src={user?.photoURL || avatar}
            alt="avatar"
          ></Avatar>

          <form className="w-full" onSubmit={handleSubmitPost}>
            <div className="flex justify-between items-center">
              <div className="w-full ml-4">
                <input
                  type="text"
                  name="text"
                  placeholder={`Whats on your mind ${
                    user?.displayName?.split(" ")[0] ||
                    userData?.name?.charAt(0).toUpperCase() +
                      userData?.name?.slice(1)
                  }`}
                  className="outline-none w-full bg-white rounded-md"
                  ref={text}
                ></input>
              </div>

              <div className="mx-4">
                {image && (
                  <img
                    className="h-24 rounded-xl"
                    src={image}
                    alt="previewImage"
                  ></img>
                )}
              </div>

              <div className="mx-4">
                <div>
                  <button
                    className="text-blue-500 hover:bg-blue-500 hover:text-white font-semibold py-1 px-2 rounded focus:outline-none transition-all duration-300"
                    type="submit"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <span
          style={{ width: `${progressBar}%` }}
          className="bg-blue-700 py-1 rounded-md"
        ></span>

        <div className="flex justify-around items-center pt-2">
          <div className="flex items-center">
            <label
              htmlFor="addImage"
              className="flex items-center cursor-pointer"
            >
              <img className="h-8 mr-4" src={addImage} alt="addImage"></img>
              <input
                id="addImage"
                type="file"
                style={{ display: "none" }}
                onChange={handleUpload}
              ></input>
            </label>
            {file && (
              <button
                className="text-blue-500 hover:bg-blue-500 hover:text-white font-semibold py-1 px-2 rounded focus:outline-none transition-all duration-300"
                onClick={submitImage}
              >
                Upload
              </button>
            )}
          </div>

          <div className="flex items-center">
            <img className="h-8 mr-4" src={live} alt="live"></img>
            <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
              Live
            </p>
          </div>

          <div className="flex items-center">
            <img className="h-8  mr-4" src={smile} alt="feeling"></img>
            <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
              Feeling
            </p>
          </div>
        </div>
      </div>

      <div className="flex-flex-col py-4 w-full">
        {state.error ? (
          <div className="flex justify-center items-center">
            alert('Something went wrong refresh and try again....')
          </div>
        ) : (
          <div>
            {state.posts.length > 0 &&
              state?.posts?.map((post, index) => {
                return (
                  <PostCard
                    key={index}
                    logo={post.logo}
                    id={post.documentId}
                    uid={post?.uid}
                    name={post.name}
                    email={post.email}
                    image={post.image}
                    text={post.text}
                    timestamp={new Date(post?.timestamp).toLocaleString()}
                  ></PostCard>
                );
              })}
          </div>
        )}
      </div>
      <div ref={scrollRef}>{/* Reference for later */}</div>
    </div>
  );
};

export default Main;
