import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteContext from "./context/note/NoteContext";
import LoadingBar from "react-top-loading-bar";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import Notes from "./components/Notes";

function App() {
  const noteContext = useContext(NoteContext);
  const { loading, setLoading } = noteContext;
  useEffect(() => {
    // Remove pre-loader when DOM is fully loaded
    window.addEventListener("load", () => {
      document.getElementById("preLoader").style.display = "none";
    });

    //Check and Set theme
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "black";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "white";
    }
  }, []);

  return (
    <>
      <Router>
        {/* Preloader  */}
        <div id="preLoader" className="z-50 top-0 bg-black w-screen h-screen fixed   bg-[url('./img/pre-load.gif')] bg-no-repeat bg-center "></div>
        <Navbar />
        <Alert />
        <LoadingBar color="#5a19f1" progress={loading} height={4} onLoaderFinished={() => setLoading(0)} />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/notes" element={<Notes />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
