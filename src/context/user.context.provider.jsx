import UserContext from "./user.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  getCookie,
  setCookies,
  removeCookies,
  checkCookies,
} from "cookies-next";

const UserContextProvider = (props) => {
  const [userToken, setUserToken] = useState("");
  const [completeLoad, setCompleteLoad] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [userStore, setUserStore] = useState([]);

  useEffect(() => {
    setCompleteLoad(false);
    const user_cookies = getCookie("user_token", {
      domain: "localhost",
      path: "/",
    })?.toString();
    if (user_cookies && user_cookies !== "") {
      _getUserInfo(user_cookies);
    }
  }, []);

  const _getUserInfo = async (token) => {
    setCompleteLoad(false);
    try {
      const userInfo = (
        await axios.get(`api/auth/info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data.data;

      if (userInfo) {
        setUserInfo(userInfo);
        _getUserStore(token);
      } else {
        _removeCookies();
      }
    } catch (error) {}
  };

  const _getUserStore = async (token) => {
    setCompleteLoad(false);
    try {
      const checkUserStore = (
        await axios.get("api/cart/checkUserStore", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data.data;
      if (checkUserStore) {
        setUserStore(checkUserStore);
      }
      _setCookies(token);
    } catch (error) {}
  };

  const _setCookies = (cookies) => {
    setCompleteLoad(false);
    setCookies("user_token", cookies, {
      domain: "localhost",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
    setUserToken(cookies);
    setCompleteLoad(true);
  };

  //

  const _setToken = (token) => {
    if (token) {
      setCompleteLoad(false);
      _getUserInfo(token);
      // _setNewCookies(token);
    }
  };

  const _setNewCookies = (token) => {
    setCompleteLoad(false);
    setCookies("user_token", token, {
      domain: "localhost",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
    setUserToken(token);
    setCompleteLoad(true);
  };

  const _removeCookies = () => {
    removeCookies("user_token", {
      domain: "localhost",
      path: "/",
    });
    Router.reload(window.location.pathname);
  };

  return (
    <UserContext.Provider
      value={{
        UserToken: userToken,
        SetToken: _setToken,
        CompleteLoad: completeLoad,
        UserInfo: userInfo,
        StoreInfo: userStore,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
