import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../context/note/NoteContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";
import visibleSvg from "../img/visibility_black_24dp.svg";
import invisibleSvg from "../img/visibility_off_black_24dp.svg";

const Signup = () => {
  const host = "https://pocket-notes-mern.herokuapp.com";
  const navigate = useNavigate();

  const noteContext = useContext(NoteContext);
  const { setNotes, showAlert, setLoading } = noteContext;

  const authContext = useContext(AuthContext);
  const { getUser } = authContext;

  useEffect(() => {
    // if token exists, navigate to Home
    if (localStorage.getItem("token")) {
      navigate("/notes");
      showAlert(true, "yellow", "You are Already Logged-in!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show Password Button
  const [loginEye, setloginEye] = useState(invisibleSvg);
  const toggleVisibility = () => {
    const loginPass = document.getElementById("signup-password");
    if (loginPass.type === "password") {
      setloginEye(visibleSvg);
      loginPass.type = "text";
    } else {
      setloginEye(invisibleSvg);
      loginPass.type = "password";
    }
  };

  // Signup data variable
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // On Chnage in Input areas
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Submit Signup form
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(30);
    setNotes([]);
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setLoading(70);
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      await getUser();
      navigate("/notes");
    }
    showAlert(json.success, null, json.msg);
    setLoading(100);
  };
  // Navigating to /login
  const navigateSignup = async () => {
    if (window.innerWidth >= 600) {
      document.getElementById("form-box").style.transform = "scale(0.88)";
      setTimeout(() => {
        navigate("/login");
      }, 220);
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="bg-neutral-200 min-h-screen  flex justify-center md:items-center py-14 px-2 dark:bg-black">
      <div
        id="form-box"
        className="mt-24 md:mt-10 max-w-xl h-max bg-white py-4 px-5 border-[1px] rounded-md border-gray-600 drop-shadow-md flex-1 dark:bg-neutral-900 dark:border-gray-700 dark:text-white transition ease-out duration-200"
      >
        <h1 className="  |  mb-6 text-2xl | sm:text-3xl  |  md:text-3xl font-bold text-center">Create a New Account </h1>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col mb-5">
            <label htmlFor="name" className="text-lg mb-1">
              Name
            </label>
            <input
              type="text"
              className=" peer mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-neutral-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-red-300 invalid:text-red-400 focus:invalid:border-red-300 focus:invalid:ring-red-300 
              dark:bg-neutral-900  dark:border-neutral-600 auto"
              id="name"
              name="name"
              autoComplete="name"
              onChange={onChange}
              minLength={3}
              required
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="signup-email" className="text-lg mb-1">
              Email address
            </label>
            <input
              type="email"
              className=" peer mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-neutral-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-red-300 invalid:text-red-400 focus:invalid:border-red-300 focus:invalid:ring-red-300 dark:bg-neutral-900 dark:border-neutral-600 auto "
              id="signup-email"
              name="email"
              autoComplete="email"
              onChange={onChange}
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="signup-password" className="text-lg mb-1">
              Password
            </label>
            <div className="flex relative items-center">
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                className=" peer mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-neutral-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-red-300 invalid:text-red-400 focus:invalid:border-red-300 focus:invalid:ring-red-300 dark:bg-neutral-900 dark:border-neutral-600 "
                onChange={onChange}
                id="signup-password"
                minLength={8}
                required
              />
              <span className="absolute right-0 cursor-pointer mr-2 mt-1 rounded-full dark:bg-neutral-800 py-1 px-1.5">
                <img className="dark:invert" src={loginEye} alt="Show Password" onClick={toggleVisibility} />
              </span>
            </div>
            <p className="mt-3 px-1 text-sm opacity-70 ">
              <span className="text-red-500 text-base"> Warning</span> : Please remember your Password!
            </p>
          </div>
          <button
            type="submit"
            className="mt-3 bg-white w-full px-4 py-1.5 text-base font-bold rounded-md border border-black  
            dark:border dark:bg-transparent  focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600
dark:focus:border-violet-600 dark:text-white dark:border-white hover:text-violet-800 dark:hover:text-violet-500 hover:ring-1 hover:ring-violet-700 hover:border-violet-600 dark:hover:border-violet-600 "
          >
            Signup
          </button>
          <p className="mt-5">
            Already have an Account?{" "}
            <span onClick={navigateSignup} className="cursor-pointer text-violet-600 hover:underline">
              Log-in
            </span>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
