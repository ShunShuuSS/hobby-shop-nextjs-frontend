import React from "react";

const UserContext = React.createContext({
  UserToken: "",
  SetToken: "",
  UserInfo: [],
  StoreInfo: "",
  CompleteLoad: undefined,
  setUpdateUserAddress: undefined,
  // last page
  LastPage: "",
  SetLastPage: "",
});

export default UserContext;
