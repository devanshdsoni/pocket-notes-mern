import React from "react";

const Editnote = (props) => {
  const { newNote, setNewNote, onUpdateSubmit } = props;
  const onChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  // Close modal Function
  const closeModal = (e) => {
    e.preventDefault();
    document.body.style.overflow = "visible";
    setTimeout(() => {
      document.getElementsByClassName("editModalBg")[0].classList.remove("modal-show");
      document.getElementsByClassName("editModal")[0].classList.remove("scale-y-0");
    }, 400);
    document.getElementsByClassName("editModal")[0].classList.add("scale-y-0");
  };

  return (
    <>
      <div className="editModalBg w-full h-screen z-50 fixed top-0 left-0 flex justify-center items-center bg-[#01010180] dark:bg-[#27272780] transition duration-300 ease-in-out invisible opacity-0 ">
        <div className="editModal transition-transform duration-300 bg-white border-2 border-neutral-500 rounded-md p-5 mx-2 w-full h-auto sm:w-5/12 dark:bg-black dark:text-white dark:border-neutral-700">
          <div className="editModalHeader relative mb-5">
            <h2 className=" mb-3 text-3xl md:text-2xl font-bold ">Edit Note</h2>
            <button
              className="form-btn-close absolute top-0.5 right-1 opacity-70  cursor-pointer bg-transparent text-xl font-semibold transition-transform hover:scale-125 hover:opacity-100"
              onClick={closeModal}
            >
              &#x2715;
            </button>
          </div>
          <form onSubmit={onUpdateSubmit}>
            <div className="flex flex-col mb-3">
              <label htmlFor="upTitle" className="text-base mb-1">
                Title
              </label>
              <input
                type="text"
                className="border px-2 rounded-md py-1.5 text-sm dark:bg-black dark:border-neutral-600 "
                id="upTitle"
                name="title"
                value={newNote.title}
                aria-describedby="emailHelp"
                onChange={onChange}
                minLength={3}
                required
              />
            </div>
            <div className="flex flex-col mb-3">
              <label htmlFor="upDescription" className="text-base mb-1">
                Description
              </label>
              <input
                type="text"
                className="border px-2 rounded-md py-1.5 text-sm dark:bg-black dark:border-neutral-600 "
                name="description"
                id="upDescription"
                value={newNote.description}
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
            <div className="flex flex-col mb-3">
              <label htmlFor="upTag" className="text-base mb-1">
                Tag
              </label>
              <input type="text" className="border px-2 rounded-md py-1.5 text-sm dark:bg-black dark:border-neutral-600 " name="tag" id="upTag" value={newNote.tag} onChange={onChange} />
            </div>
            <button type="submit" className="my-3   text-center px-4 py-2  text-white  rounded-md  bg-violet-600 hover:bg-violet-700  ">
              Update Note
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Editnote;
