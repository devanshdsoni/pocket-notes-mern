import React from "react";
import { Link } from "react-router-dom";
import twitterSvg from "../img/twitter.svg";
import githubSvg from "../img/github.svg";
import linkedinSvg from "../img/linkedin.svg";

const Footer = () => {
  return (
    <div className=" bg-neutral-300 dark:bg-neutral-800 dark:text-white ">
      <div className=" flex flex-col md:flex-row px-3 md:space-x-2 py-5  m-auto   md:max-w-2xl | lg:max-w-4xl | xl:max-w-6xl ">
        <div className="my-5 mx-2 flex-1 md:pr-16 ">
          <h2 className="  cursor-default relative mb-5 text-lg font-semibold before:block before:absolute before:bg-violet-500 before:rounded-full before:-bottom-2 before:w-11 before:h-[3px]">
            Try TextAide
          </h2>
          <p className="pl-1 opacity-70">Lorem ipsum dolor sit amet consectetur adipis icing elit. Quia, molestias?</p>
        </div>

        <div className="my-5 mx-2 flex-1">
          <h2 className="  cursor-default relative mb-5 text-lg font-semibold before:block before:absolute before:bg-violet-500 before:rounded-full before:-bottom-2 before:w-11 before:h-[3px]">
            Quick Links
          </h2>
          <div className=" pl-1 space-y-3 w-fit md:cursor-pointer">
            <p>
              <Link className=" opacity-70 hover:opacity-100" to="/">
                Home
              </Link>
            </p>
            <p>
              <Link to="/" className=" opacity-70 hover:opacity-100">
                About Us
              </Link>
            </p>
            <p>
              <Link to="/login" className=" opacity-70 hover:opacity-100">
                Login
              </Link>
            </p>
            <p>
              <Link to="/signup" className=" opacity-70 hover:opacity-100">
                Signup
              </Link>
            </p>
            <p>
              <Link to="/" className=" opacity-70 hover:opacity-100">
                Contact
              </Link>
            </p>
          </div>
        </div>

        <div className="my-5 mx-2 flex-1 space-y-3">
          <h2 className=" cursor-default  relative mb-5 text-lg font-semibold before:block before:absolute before:bg-violet-500 before:rounded-full before:-bottom-2 before:w-11 before:h-[3px]">
            Contact
          </h2>
          <p className="pl-1">
            Phone :{" "}
            <a className="opacity-70 hover:opacity-100 text-sm" href="tel:6260478442">
              6260478442
            </a>{" "}
          </p>
          <p className="pl-1">
            Email :{" "}
            <a className="opacity-70 hover:opacity-100 text-sm" href="mailto:devanshsoni811@gmail.com">
              devanshsoni811@gmail.com
            </a>{" "}
          </p>
          <div className=" pl-1 flex space-x-4">
            <a href="https://www.linkedin.com/in/devanshdsoni/" target="_blank" rel="noreferrer">
              <img className="dark:invert opacity-80 hover:opacity-100 " alt="Linkedin" src={linkedinSvg} />
            </a>
            <a href="https://github.com/devanshdsoni" target="_blank" rel="noreferrer">
              <img className="dark:invert opacity-80 hover:opacity-100 " alt="Github" src={githubSvg} />
            </a>
            <a href="https://twitter.com/devanshdsoni" target="_blank" rel="noreferrer">
              <img className="dark:invert opacity-80 hover:opacity-100 " alt="Twitter" src={twitterSvg} />
            </a>
          </div>
        </div>
      </div>
      <div className="h-12 flex items-center justify-center font-mono font-semibold  text-sm  bg-neutral-400 text-black | md:text-base  | dark:bg-neutral-900 dark:text-white">
        {" "}
        <span className="opacity-70">
          Designed and Created by{" "}
          <a
            className="hover:text-violet-900 dark:hover:text-violet-500  underline underline-offset-2 decoration-dotted"
            href="https://github.com/devanshdsoni/pocket-notes-mern"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Devansh Soni
          </a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
