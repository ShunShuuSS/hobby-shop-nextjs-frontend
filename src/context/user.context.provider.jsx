/* eslint-disable react-hooks/exhaustive-deps */
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
import config from "../../constants/config";

const UserContextProvider = (props) => {
  const [userToken, setUserToken] = useState("");
  const [completeLoad, setCompleteLoad] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [userStore, setUserStore] = useState([]);
  const [updateUserAddress, setUpdateUserAddress] = useState(false);
  const [lastPage, setLastPage] = useState("/");

  const router = useRouter();

  useEffect(() => {
    const user_cookies = getCookie("user_token", {
      ...config.cookies_domain,
    })?.toString();

    if (user_cookies && user_cookies !== "") {
      setCompleteLoad(false);
      _relogin(user_cookies);
    }
  }, []);

  useEffect(() => {
    if (updateUserAddress) {
      setCompleteLoad(false);
      console.log("jalan");
      const user_cookies = getCookie("user_token", {
        ...config.cookies_domain,
      })?.toString();
      if (user_cookies && user_cookies !== "") {
        _relogin(user_cookies);
      }
    }
  }, [updateUserAddress]);

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
    } catch (error) {
      _removeCookies();
    }
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
        setUpdateUserAddress(false);
        _getUserStore(token);
      } else {
        setUpdateUserAddress(false);
        _removeCookies();
      }
    } catch (error) {
      setUpdateUserAddress(false);
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
        setUserStore(checkUserStore[0]);
      }
      _setNewCookies(token);
    } catch (error) {
      _removeCookies();
    }
  };

  const _setNewCookies = (token) => {
    setCompleteLoad(false);
    setCookies("user_token", token, {
      ...config.cookies_domain,
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
      ...config.cookies_domain,
    });
    setCompleteLoad(true);
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
        setUpdateUserAddress: setUpdateUserAddress,
        LastPage: lastPage,
        SetLastPage: setLastPage,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
