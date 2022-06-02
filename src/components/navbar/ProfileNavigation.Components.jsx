/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { checkCookies, removeCookies } from "cookies-next";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import config from "../../../constants/config";
import UserContext from "../../context/user.context";
import ProfileNavigationOption from "./ProfileNavigationOption.Components";
const ProfileNavigation = () => {
  const [userData, setUserData] = useState([]);
  const [checkUserStore, setCheckUserStore] = useState(true);

  const userContext = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (userContext.CompleteLoad == true) {
      if (userContext.UserToken !== "") {
        if (userContext.StoreInfo.length !== 0) {
          setCheckUserStore(true);
        } else {
          setCheckUserStore(false);
        }
        setUserData(userContext.UserInfo);
      }
    }
  }, [userContext.CompleteLoad]);

  // Logout Session
  const removeUserCookies = () => {
    if (
      checkCookies("user_token", {
        ...config.cookies_domain,
      })
    ) {
      removeCookies("user_token", {
        ...config.cookies_domain,
      });
      router.reload(window.location.pathname);
    }
  };

  return (
    <>
      <ul
        className={`absolute hidden group-hover:block mt-[3rem] w-[15rem] right-0 bg-white`}
      >
        <div className={`rounded outline-style-1`}>
          <ProfileNavigationOption link={`/profile`}>
            Lihat Profil
          </ProfileNavigationOption>
          <ProfileNavigationOption
            link={`/seller/manage-product`}
            addClass={`${checkUserStore ? "" : "hidden"}`}
          >
            Toko
          </ProfileNavigationOption>
          <ProfileNavigationOption
            link={`/seller/register-store`}
            addClass={`${checkUserStore == false ? "" : "hidden"} ${
              router.pathname == "/seller/register-store" ? "hidden" : ""
            }`}
          >
            Buka Toko
          </ProfileNavigationOption>
          <ProfileNavigationOption link={`/transaction`}>
            Transaksi
          </ProfileNavigationOption>
          <div onClick={() => removeUserCookies()}>
            <ProfileNavigationOption link={`/`}>Keluar</ProfileNavigationOption>
          </div>
        </div>
      </ul>
    </>
  );
};

export default ProfileNavigation;
