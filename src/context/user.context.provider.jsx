import UserContext from "./user.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  getCookie,
  setCookies,
  removeCookies,
  checkCookies,
} from "cookies-next";
import { useRouter } from "next/router";
import moment from "moment";

const UserContextProvider = (props) => {
  const [userToken, setUserToken] = useState("");
  const [completeLoad, setCompleteLoad] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [userStore, setUserStore] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setCompleteLoad(false);
    const user_cookies = getCookie("user_token", {
      domain: "localhost",
      path: "/",
    })?.toString();
    if (user_cookies && user_cookies !== "") {
      _relogin(user_cookies);
    }
  }, []);

  const _relogin = async (cookie) => {
    setCompleteLoad(false);
    try {
      const relogin = (
        await axios.get("api/auth/relogin", {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        })
      ).data.data;

      if (relogin.length !== 0) {
        _setToken(relogin.token);
      }
    } catch (error) {}
  };

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

      if (userInfo.length !== 0) {
        setUserInfo(userInfo);
        _getUserStore(token);
      } else {
        _removeCookies();
      }
    } catch (error) {
      _removeCookies();
    }
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

      if (checkUserStore.length !== 0) {
        setUserStore(checkUserStore);
      }
      _setNewCookies(token);
    } catch (error) {}
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

  // Login Session

  const _setToken = (token) => {
    if (token) {
      setCompleteLoad(false);
      _getUserInfo(token);
    } else {
      _removeCookies();
    }
  };

  const _removeCookies = () => {
    setCompleteLoad(false);
    removeCookies("user_token", {
      domain: "localhost",
      path: "/",
    });
    router.reload(window.location.pathname);
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
