import { createContext, useState } from "react";
const NoteContext = createContext();

const NoteState = (props) => {
  const host = "https://pocket-notes-mern.onrender.com";

  //Notes variable using useState hook
  const iNotes = [];
  const [notes, setNotes] = useState(iNotes);

  //Alert variable using useState hook
  const [alert, setAlert] = useState({ show: false, success: true, color: "", msg: "" });

  //Loading variable using useState hook
  const [loading, setLoading] = useState(0);

  //Show Alert Function
  const showAlert = (success, color, msg) => {
    //if color = null, then auto detect color using success
    if (!color) {
      color = success ? "green" : "red";
    }
    setAlert({ show: true, success: success, color: color, msg: msg });
    setTimeout(() => {
      setAlert({ show: false, success: success, color: color, msg: msg });
    }, 3000);
  };

  //Get notes Function to fetch all notes from server
  const getNotes = async () => {
    const response = await fetch(`${host}/api/note/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (!json.success) {
      setNotes([]);
      localStorage.removeItem("token");
      showAlert(json.success, null, json.msg);
      return;
    } else {
      setNotes(json.notes);
    }
  };

  // Add a new note
  const addNote = async (note) => {
    setLoading(20);
    const response = await fetch(`${host}/api/note/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(note),
    });
    setLoading(50);
    const json = await response.json();
    if (!json.success) {
      localStorage.removeItem("token");
      showAlert(json.success, null, json.msg);
      setLoading(100);
    } else {
      setNotes(notes.concat(json.note));
      showAlert(json.success, null, json.msg);
      setLoading(100);
    }
  };

  // Edit a note
  const updateNote = async (newNote) => {
    setLoading(20);
    const note = {
      title: newNote.title,
      description: newNote.description,
      tag: newNote.tag,
    };
    const response = await fetch(`${host}/api/note/updatenote/${newNote.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(note),
    });
    setLoading(50);
    const json = await response.json();
    if (!json.success) {
      localStorage.removeItem("token");
      showAlert(json.success, null, json.msg);
      setLoading(100);
    } else {
      const newNotes = notes.map((note) => {
        return note._id !== json.updatedNote._id ? note : json.updatedNote;
      });
      setNotes(newNotes);
      showAlert(json.success, null, json.msg);
      setLoading(100);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    setLoading(20);
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    setLoading(50);
    const json = await response.json();
    if (!json.success) {
      localStorage.removeItem("token");
      showAlert(json.success, null, json.msg);
      setLoading(100);
    } else {
      setNotes(
        notes.filter((note) => {
          return note._id !== json.deletedNote._id;
        })
      );
      showAlert(json.success, null, json.msg);
      setLoading(100);
    }
  };

  return <NoteContext.Provider value={{ notes, setNotes, getNotes, addNote, updateNote, deleteNote, alert, showAlert, loading, setLoading }}>{props.children}</NoteContext.Provider>;
};

export { NoteState };
export default NoteContext;
