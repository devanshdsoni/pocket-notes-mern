import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth/AuthContext";
import { Link } from "react-router-dom";
import about1 from "../img/home-about-1.webp";
import about2 from "../img/home-about-2.jpg";
import about3 from "../img/home-about-3.jpg";
import Footer from "./Footer";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { user, getUser } = authContext;

  useEffect(() => {
    if (localStorage.token) {
      if (!user.success || user.success === false) getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="Main h-96 mt-16  bg-slate-200  flex bg-gradient-to-t from-fuchsia-900 via-purple-900 to-violet-900 bg-blend-multiply">
        <div className=" px-9 text-center text-white w-full flex flex-col justify-center items-center">
          <h1 className=" mb-3 text-4xl font-black leading-5 font-serif select-none  | md:text-5xl">WELCOME</h1>
          <p className="text-base mt-3 font-medium | md:text-xl  ">Take Notes, Edit, Delete, Create a To-do list & Share with your Friends.</p>
          <div className=" mt-10 flex  ">
            {localStorage.token ? (
              <Link to="/notes" className=" py-2 px-5 border-2 border-white rounded-sm font-mono tracking-wide font-bold  hover:border-black hover:bg-[#ffffffb5] hover:text-black md:text-xl">
                {" "}
                Continue Taking Notes{" "}
              </Link>
            ) : (
              <Link to="/signup" className=" py-2 px-5 border-2 border-white rounded-sm font-mono tracking-wide font-bold  hover:border-black hover:bg-[#ffffffb5] hover:text-black md:text-xl ">
                {" "}
                Start Taking Notes for Free{" "}
              </Link>
            )}
          </div>
        </div>
      </div>
      <div id="about" className=" AboutUs    my-5 py-5 container text-center">
        <div className="  md:max-w-2xl | lg:max-w-4xl | xl:max-w-6xl m-auto">
          <h1 className="text-3xl select-none  my-2 font-sans font-medium md:text-4xl">
            <span className="before:block before:absolute before:-inset-2 before:-skew-y-2 before:bg-violet-700  before:drop-shadow-md   dark:before:bg-violet-500  relative inline-block">
              <span className="relative text-white dark:text-black">About Us</span>
            </span>
          </h1>
          <p className="my-10 text-lg font-medium font-serif   mx-3 md:text-xl dark:text-white">
            Pocket Notes is a Web Application where you can take E-Notes anytime anywhere. You can Add, Modify or Delete a Note. Create a free acconut and Login to get your notes from anywhere in the
            world. Enjoy using the application in Light or Dark theme.
          </p>
          <span className=" block border-t-2 my-6 border-neutral-400 w-40 m-auto "></span>
          <q className="font-medium text-base md:text-lg dark:text-white opacity-80">Acquiring the habit of note-taking is therefore a wonderfully complementary skill to that of listening.</q>
          <span className="block font-medium mt-2 text-neutral-500"> - Richard Branson</span>
        </div>
      </div>

      <div className=" bg-neutral-100 dark:bg-neutral-900 py-14">
        <div className="flex flex-col md:flex-row items-center justify-between  |  md:max-w-2xl | lg:max-w-4xl | xl:max-w-6xl m-auto">
          <div className="  relative group select-none w-80 mx-5 my-5 drop-shadow-lg cursor-default ">
            <img className="group-hover:shadow-sm group-hover:scale-[1.01]  shadow-black rounded-xl  select-none h-60 object-cover  transition-all" src={about1} alt="About " />
            <div
              className=" select-none absolute bottom-0 w-full h-full before:rounded-xl after:rounded-xl 
              before:origin-bottom before:transition-all before:duration-300 before:w-full before:h-full  before:block before:absolute before:bg-indigo-500 before:rotate-0 before:-z-10 group-hover:before:rotate-3
              after:origin-bottom after:transition-all after:duration-300 after:w-full after:h-full  after:block after:absolute after:top-0 after:bg-violet-600 after:rotate-0 group-hover:after:-rotate-3 after:-z-10 "
            >
              {" "}
              <div className="w-full h-full flex justify-center items-end overflow-hidden ">
                <span className="py-4 bg-white text-xl rounded-b-xl text-center w-full  text-black font-serif font-black bg-opacity-80 transition-all duration-300 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  Make To-Do List
                </span>
              </div>{" "}
            </div>
          </div>
          <div className="  relative group select-none w-80 mx-5 my-5 drop-shadow-lg cursor-default ">
            <img className="group-hover:shadow-sm group-hover:scale-[1.01] shadow-black rounded-xl  select-none h-60 object-cover  transition-all" src={about2} alt="About " />
            <div
              className=" select-none absolute bottom-0 w-full h-full before:rounded-xl after:rounded-xl 
              before:origin-bottom before:transition-all before:duration-300 before:w-full before:h-full  before:block before:absolute before:bg-indigo-500 before:rotate-0 before:-z-10 group-hover:before:rotate-3
              after:origin-bottom after:transition-all after:duration-300 after:w-full after:h-full  after:block after:absolute after:top-0 after:bg-violet-600 after:rotate-0 group-hover:after:-rotate-3 after:-z-10 "
            >
              {" "}
              <div className="w-full h-full flex justify-center items-end overflow-hidden ">
                <span className="py-2 bg-white text-xl rounded-b-xl text-center w-full  text-black font-serif font-black bg-opacity-80 transition-all  duration-300 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  Take E-Notes Anytime Anywhere
                </span>
              </div>{" "}
            </div>
          </div>
          <div className="  relative group select-none w-80 mx-5 my-5 drop-shadow-lg cursor-default ">
            <img className="group-hover:shadow-sm group-hover:scale-[1.01] shadow-black rounded-xl  select-none h-60 object-cover  transition-all" src={about3} alt="About " />
            <div
              className=" select-none absolute bottom-0 w-full h-full before:rounded-xl after:rounded-xl 
              before:origin-bottom before:transition-all before:duration-300 before:w-full before:h-full  before:block before:absolute before:bg-indigo-500 before:rotate-0 before:-z-10 group-hover:before:rotate-3
              after:origin-bottom after:transition-all after:duration-300 after:w-full after:h-full  after:block after:absolute after:top-0 after:bg-violet-600 after:rotate-0 group-hover:after:-rotate-3 after:-z-10 "
            >
              {" "}
              <div className="w-full h-full flex justify-center items-end overflow-hidden ">
                <span className="py-2 px-2 bg-white text-xl rounded-b-xl text-center w-full  text-black font-serif font-black bg-opacity-80 transition-all duration-300 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  Share Notes with Your Friends
                </span>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
