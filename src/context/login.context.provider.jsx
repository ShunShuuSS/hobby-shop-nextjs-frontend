import LoginContext from "./login.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { getCookie, setCookies } from "cookies-next";

const LoginContextProvider = (props) => {
  const [Token, setToken] = useState("");
  const [User, setUser] = useState("");

  useEffect(() => {
    UserToken();
    _setCookies();
  }, [Token]);

  const UserToken = (token) => {
    setToken(token);
    setUser(token);
  };

  const _setCookies = () => {
    if (Token) {
      setCookies("user_token", Token, {
        domain: "localhost",
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
      });
    } else {
      const cookies = getCookie("user_token", {
        domain: "localhost",
        path: "/",
      });
      setCookies("user_token", cookies, {
        domain: "localhost",
        path: "/",
      });
      setUser(cookies);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        UserToken: User,
        SetToken: UserToken,
        Cookies: _setCookies,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
