import React from "react";
import editSvg from "../img/edit_black_24dp.svg";
import deleteSvg from "../img/delete_black_24dp.svg";

const Noteitem = (props) => {
  const { _id, title, description, tag } = props.note;
  return (
    <>
      <div className="noteitem  px-4 pb-5 w-full md:w-min">
        <div className="card group rounded-md flex flex-col border  w-full md:w-64 cursor-default transition shadow-blue-500 shadow-[0px_0px_2px] hover:shadow-blue-500 hover:shadow-[0px_1px_4px]  hover:-translate-y-0.5 dark:border-neutral-600  ">
          <div className="card-body rounded-t-md p-4 relative bg-white  overflow-x-auto dark:bg-[#0b0b0b] dark:text-white ">
            <h3 className="card-title text-base  font-semibold mb-3">{title}</h3>
            <p className="card-desc text-sm break-all">{description}</p>
          </div>
          <div className="card-footer rounded-b-md flex py-2 pr-0 pl-4 bg-neutral-300  dark:bg-[#292929] dark:text-white">
            <div>{tag ? <small className="bg-neutral-600 text-white px-3 py-1 rounded-full">{tag} </small> : ""}</div>
            <div className="card-btn flex ml-auto space-x-2 mr-3 select-none">
              <img
                src={editSvg}
                className="cursor-pointer  md:opacity-0 md:group-hover:opacity-100 transition  ease-in-out  hover:scale-110 dark:invert"
                alt="edit"
                onClick={() => props.onEditClick(props.note)}
              />

              <img
                src={deleteSvg}
                className="cursor-pointer  md:opacity-0 md:group-hover:opacity-100 transition ease-in-out hover:scale-110 dark:invert"
                alt="delete"
                onClick={() => props.handleDelete(_id)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Noteitem;
