import React, { useContext } from "react";
import NoteContext from "../context/note/NoteContext";
import successSvg from "../img/done_black_24dp.svg";
import errorSvg from "../img/error_black_24dp.svg";

function Alert() {
  const noteContext = useContext(NoteContext);
  const { alert } = noteContext;

  let show = "-translate-y-14";
  if (alert.show) {
    show = "translate-y-0";
  } else {
    show = "-translate-y-14";
  }

  let color;
  if (alert.color === "red") {
    color = "bg-red-400";
  } else if (alert.color === "yellow") {
    color = "bg-yellow-200";
  } else if (alert.color === "green") {
    color = "bg-green-400";
  }
  return (
    <div className={`bg-transparent h-14 w-full fixed top-[70px] z-10 transition-all duration-500 ${show}`}>
      <div className={`w-max flex space-x-3 px-4 py-3   rounded-b-lg m-auto  ${color} `}>
        {alert.success ? <img src={successSvg} alt="Success" /> : <img src={errorSvg} alt="Error" />}
        <p>{alert.msg}</p>
      </div>
    </div>
  );
}

export default Alert;
