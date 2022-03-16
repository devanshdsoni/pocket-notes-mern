import React from "react";
import ReactDOM from "react-dom";
import { NoteState } from "./context/note/NoteContext";
import { AuthState } from "./context/auth/AuthContext";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <NoteState>
        <App />
      </NoteState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
