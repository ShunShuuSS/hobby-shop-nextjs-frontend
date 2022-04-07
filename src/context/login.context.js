import React from "react";

const LoginContext = React.createContext({
  UserToken: "",
  SetToken: "",
  Cookies: "",
});

export default LoginContext;
