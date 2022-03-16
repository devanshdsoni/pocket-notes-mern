import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/note/NoteContext";
import logoLight from "../img/logo-light.png";
import logoDark from "../img/logo-dark.png";
import LightModeSvg from "../img/light_mode_black_24dp.svg";
import DarkModeSvg from "../img/dark_mode_black_24dp.svg";
import AuthContext from "../context/auth/AuthContext";

const Navbar = () => {
  const noteContext = useContext(NoteContext);
  const { showAlert, setLoading } = noteContext;

  const authContext = useContext(AuthContext);
  const { user, setUser } = authContext;

  const navigate = useNavigate();
  let location = useLocation();

  const [themeSvg, setThemeSvg] = useState(LightModeSvg);

  useEffect(() => {
    if (localStorage.theme === "light" || !localStorage.theme) {
      setThemeSvg(LightModeSvg);
    } else {
      setThemeSvg(DarkModeSvg);
    }
  }, []);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({ success: "", name: "", email: "" });
    showAlert(true, "green", "Logout Successful");
    navigate("/login");
  };

  // Function for taking pause
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Switching between Light and Dark mode
  const handleMode = async () => {
    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
    } else {
      localStorage.theme = "dark";
    }

    if (localStorage.theme === "dark") {
      setLoading(40);
      await sleep(400);
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "black";
      setThemeSvg(DarkModeSvg);
      setLoading(100);
      showAlert(true, "yellow", "Switched to Dark Mode");
    } else {
      setLoading(40);
      await sleep(400);
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "white";
      setThemeSvg(LightModeSvg);
      setLoading(100);
      showAlert(true, "yellow", "Switched to Light Mode");
    }
  };

  // Function to Expand Navbar in Mobile
  const navExpand = () => {
    const navbarCollapse = document.getElementsByClassName("navbar-collapse")[0];
    const navCollapseBtn = document.getElementsByClassName("nav-collapse-btn")[0];
    if (navbarCollapse.classList.contains("hidden")) {
      navbarCollapse.classList.remove("hidden");
      navbarCollapse.classList.add("flex");

      // navCollapseBtn Effect -
      navCollapseBtn.children[0].classList.remove("top-0");
      navCollapseBtn.children[0].classList.add("top-2");
      navCollapseBtn.children[0].classList.add("rotate-[135deg]");
      navCollapseBtn.children[2].classList.remove("top-4");
      navCollapseBtn.children[2].classList.add("top-2");
      navCollapseBtn.children[2].classList.add("rotate-[-135deg]");
      navCollapseBtn.children[1].classList.add("-translate-x-10");
      navCollapseBtn.children[1].classList.add("opacity-0");
    } else {
      navbarCollapse.classList.remove("flex");
      navbarCollapse.classList.add("hidden");

      // navCollapseBtn Effect -
      navCollapseBtn.children[0].classList.add("top-0");
      navCollapseBtn.children[0].classList.remove("top-2");
      navCollapseBtn.children[0].classList.remove("rotate-[135deg]");
      navCollapseBtn.children[2].classList.add("top-4");
      navCollapseBtn.children[2].classList.remove("top-2");
      navCollapseBtn.children[2].classList.remove("rotate-[-135deg]");
      navCollapseBtn.children[1].classList.remove("-translate-x-10");
      navCollapseBtn.children[1].classList.remove("opacity-0");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 shadow-md  bg-white  z-20 dark:shadow dark:shadow-neutral-700 dark:bg-neutral-800 dark:text-white">
        <nav className="flex flex-wrap max-w-2xl m-auto justify-between items-center  |  md:max-w-2xl | lg:max-w-4xl | xl:max-w-6xl">
          <div className="px-4 py-2.5  w-full flex flex-wrap justify-between items-center select-none min-h-[70px] | md:py-0">
            {document.body.style.backgroundColor === "black" ? (
              <Link className="font-bold text-2xl " to="/">
                <img className="w-28 md:w-32 " src={logoDark} alt="Pocket Notes Logo" />
              </Link>
            ) : (
              <Link className="font-bold text-2xl " to="/">
                <img className="w-28 md:w-32" src={logoLight} alt="Pocket Notes Logo" />
              </Link>
            )}

            <div className=" flex items-center align-middle mx-2 space-x-7 md:order-3 ">
              <img
                className=" rounded-3xl cursor-pointer select-none transition-all duration-300 hover:-rotate-45 -scale-x-100   dark:invert "
                src={themeSvg}
                alt="Toggle Theme"
                onClick={handleMode}
              />
              <div className="nav-collapse-btn  relative h-5 w-7 | md:hidden" onClick={navExpand}>
                <span className="absolute transition-all duration-300 h-[3px] w-full bg-neutral-500 rounded-lg top-0 "></span>
                <span className="absolute transition-all duration-300 h-[3px] w-full bg-neutral-500 rounded-lg top-2 "></span>
                <span className="absolute transition-all duration-300 h-[3px] w-full bg-neutral-500 rounded-lg top-4 "></span>
              </div>
            </div>

            <div className="navbar-collapse transition-all hidden basis-full | md:grow md:block md:basis-0 md:order-2 md:mx-2">
              <ul className="flex flex-col w-full text-base font-semibold pb-4 px-1 space-y-4 | md:pb-0 md:items-center md:justify-end md:space-y-0 md:space-x-6 md:flex-row">
                <li></li>
                <li className={`hover:text-violet-500 ${location.pathname === "/" ? "text-violet-500" : ""}`}>
                  <Link to="/">HOME</Link>
                </li>
                <li className="hover:text-violet-500">
                  <Link to="/#about">ABOUT</Link>
                </li>
                <hr className="md:hidden" />
                {localStorage.getItem("token") ? (
                  <div>
                    {" "}
                    <p className="peer group my-0 relative text-lg  md:cursor-pointer ">
                      Hi, <span className="underline underline-offset-2 decoration-dotted md:no-underline"> {user.name}</span>
                      <span className="hidden md:inline-block transition-all group-hover:-rotate-180 "> &#x025BE; </span>
                    </p>
                    <div className=" w-full transition-all px-2 md:py-2  bg-white | md:transition-none md:w-60 md:absolute md:border-x md:border-y md:invisible md:peer-hover:visible hover:visible dark:bg-neutral-800   dark:border-neutral-500">
                      <div className="my-2  md:my-0 font-normal opacity-70">{user.email}</div>
                      <div className="mt-4  flex md:my-2 md:justify-between space-x-2 ">
                        <Link
                          className={` md:w-full text-center px-6 md:px3 py-2  text-white  rounded-full  bg-violet-600 hover:bg-violet-700 ${
                            location.pathname === "/notes" ? " shadow-md shadow-violet-400 dark:shadow-violet-800" : ""
                          } `}
                          to="/notes"
                        >
                          My Notes
                        </Link>
                        <Link
                          className="bg-white px-4 py-1.5 text-base font-bold rounded-full border-2   dark:bg-transparent   text-violet-800 dark:text-violet-500 hover:ring-1 ring-violet-700 border-violet-600 dark:border-violet-600"
                          to="/login"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <li className=" flex justify-between items-center space-x-3">
                    <Link
                      className={`text-white  w-full h-fit text-center px-4 py-1.5 rounded-full  bg-violet-600 hover:bg-violet-700 ${
                        location.pathname === "/login" ? " shadow-md shadow-violet-400 dark:shadow-violet-800" : ""
                      } `}
                      to="/login"
                    >
                      Login
                    </Link>
                    <Link
                      className={` text-white  w-full h-fit text-center px-3  py-1.5 rounded-full  bg-violet-600  hover:bg-violet-700 ${
                        location.pathname === "/signup" ? " shadow-md shadow-violet-400 dark:shadow-violet-800" : ""
                      } `}
                      to="/signup"
                    >
                      Signup
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
