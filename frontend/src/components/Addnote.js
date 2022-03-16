import React, { useContext, useState } from "react";
import NoteContext from "../context/note/NoteContext";

const Addnote = () => {
  const noteContext = useContext(NoteContext);
  const { addNote } = noteContext;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // Submit Function to add a new Note
  const onSubmit = (e) => {
    e.preventDefault();
    addNote(note);
    setNote({ title: "", description: "", tag: "" });
  };
  return (
    <div className="container  dark:text-white ">
      <h1 id="addnote" className="mt-8 mb-3 text-3xl md:text-4xl font-bold">
        Add a New Note
      </h1>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col mb-5">
          <label htmlFor="title" className="text-lg mb-1">
            Title
          </label>
          <input
            type="text"
            className="border mt-1 block w-full px-3 py-1.5 rounded-md text-base placeholder-neutral-500 placeholder:tracking-wide dark:bg-black dark:border-neutral-600 select-none"
            id="title"
            name="title"
            placeholder="Enter title of your note"
            value={note.title}
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={3}
            required
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="description" className="text-lg mb-1">
            Description
          </label>
          <input
            type="text"
            className="border mt-1 block w-full px-3 py-1.5 rounded-md text-base placeholder-neutral-500 dark:bg-black dark:border-neutral-600 select-none "
            name="description"
            placeholder="Enter a brief description of your note"
            id="description"
            value={note.description}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="tag" className="text-lg mb-1">
            Tag
          </label>
          <input
            type="text"
            className="border mt-1 block w-full px-3 py-1.5 rounded-md text-base placeholder-neutral-500 dark:bg-black dark:border-neutral-600 select-none "
            name="tag"
            placeholder="Tag for your note"
            id="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <button type="submit" className=" my-1  px-4 py-1.5 text-lg rounded-md  text-white  bg-violet-800 hover:bg-violet-700">
          Add note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
