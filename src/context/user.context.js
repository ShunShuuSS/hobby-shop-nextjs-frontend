import React from "react";

const UserContext = React.createContext({
  UserToken: "",
  SetToken: "",
  UserInfo: [],
  CompleteLoad: undefined,
});

export default UserContext;
