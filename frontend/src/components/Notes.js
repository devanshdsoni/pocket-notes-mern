import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/note/NoteContext";
import AuthContext from "../context/auth/AuthContext";
import Noteitem from "./Noteitem";
import Editnote from "./Editnote";
import Addnote from "./Addnote";
import Footer from "./Footer";
import refreshGif from "../img/refresh.gif";
import refreshStaticSvg from "../img/refresh.svg";

const Notes = () => {
  const navigate = useNavigate();

  const noteContext = useContext(NoteContext);
  const { notes, setNotes, getNotes, updateNote, deleteNote, showAlert } = noteContext;

  const authContext = useContext(AuthContext);
  const { user, setUser, getUser } = authContext;

  useEffect(async () => {
    if (localStorage.getItem("token")) {
      if (!user.success || user.success === false) getUser();

      document.getElementById("syncNotes").src = refreshGif;
      await getNotes();
      document.getElementById("syncNotes").src = refreshStaticSvg;
    } else {
      navigate("/login");
      setUser({ success: "", name: "", email: "" });
      setNotes([]);
      showAlert(false, "yellow", "Please Login to access Notes");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Update note variable
  const [newNote, setNewNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });
  // When Edit button clicked
  const onEditClick = (note) => {
    if (!localStorage.token) {
      navigate("/login");
      return;
    }
    setNewNote({
      id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag,
    });
    document.body.style.overflow = "hidden";
    document.getElementsByClassName("editModalBg")[0].classList.add("modal-show"); // Show Edit Modal

    //Close Edit Modal if 'esc' key pressed
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        if (document.getElementsByClassName("editModalBg")[0].classList.contains("modal-show")) {
          document.body.style.overflow = "visible";
          document.getElementsByClassName("editModalBg")[0].classList.remove("modal-show");
        }
      }
    });
  };

  // Submit Updated note and Update note
  const onUpdateSubmit = (e) => {
    e.preventDefault();
    document.body.style.overflow = "visible";
    document.getElementsByClassName("editModalBg")[0].classList.remove("modal-show");
    updateNote(newNote);
  };

  // Delete Note
  const handleDelete = (id) => {
    if (!localStorage.token) {
      navigate("/login");
      return;
    }
    if (window.confirm("Confirm delete note?")) {
      deleteNote(id);
    }
  };

  return (
    <>
      <div className="mt-24 mb-10 px-2 ">
        <Addnote />
        <Editnote newNote={newNote} setNewNote={setNewNote} onUpdateSubmit={onUpdateSubmit} />
        <div className="container ">
          <div className="flex items-center space-x-3 mt-10 mb-6 ">
            <h1 id="notes" className=" text-3xl md:text-4xl font-bold dark:text-white">
              Your Notes
            </h1>
            <img
              id="syncNotes"
              className="w-7 md:mt-1 cursor-pointer "
              onClick={async (e) => {
                e.target.src = refreshGif;
                await getNotes();
                e.target.src = refreshStaticSvg;
                if (!localStorage.token) {
                  navigate("/login");
                } else {
                  showAlert(true, null, "Note Fetched Successfully!");
                }
              }}
              src={refreshStaticSvg}
              alt="Sync Notes"
            />
          </div>
          {notes.length === 0 ? <p className="mb-32 font-thin text-black dark:text-white">No notes to display</p> : ""}
          <div className="notes-container flex my-4 flex-wrap justify-start md:justify-start ">
            {notes.length !== 0 &&
              notes.map((note) => {
                return <Noteitem key={note._id} note={note} handleDelete={handleDelete} onEditClick={onEditClick} />;
              })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notes;
