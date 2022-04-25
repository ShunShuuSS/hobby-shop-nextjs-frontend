import React from "react";

const UserContext = React.createContext({
  UserToken: "",
  SetToken: "",
  UserInfo: [],
  StoreInfo: "",
  CompleteLoad: undefined,
});

export default UserContext;
