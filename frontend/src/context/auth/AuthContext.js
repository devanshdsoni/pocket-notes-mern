import { createContext, useState } from "react";
const AuthContext = createContext();

const AuthState = (props) => {
  const host = "https://take-notes-mern.herokuapp.com";

  const [user, setUser] = useState({ success: "", name: "", email: "" });

  const getUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setUser({ success: json.success, name: json.user.name, email: json.user.email });
  };

  return <AuthContext.Provider value={{ user, setUser, getUser }}>{props.children}</AuthContext.Provider>;
};

export { AuthState };
export default AuthContext;
