import React from "react";

const UserContext = React.createContext({
  UserInfo: undefined,
  SetUserInfo: undefined,
});

export default UserContext;
