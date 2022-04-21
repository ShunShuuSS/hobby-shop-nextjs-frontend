import axios from "axios";
import { checkCookies, removeCookies } from "cookies-next";
import Link from "next/link";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user.context";
import ProfileNavigationOption from "./ProfileNavigationOption.Components";
const ProfileNavigation = () => {
  const [checkUserStore, setCheckUserStore] = useState(false);

  const userContext = useContext(UserContext);

  const removeUserCookies = () => {
    if (
      checkCookies("user_token", {
        domain: "localhost",
        path: "/",
      })
    ) {
      removeCookies("user_token", {
        domain: "localhost",
        path: "/",
      });
      Router.reload(window.location.pathname);
    }
  };

  const _checkUserStore = async () => {
    const check = await axios.get("api/cart/checkUserStore", {
      headers: {
        Authorization: `Bearer ${userContext.UserToken}`,
      },
    });
  };

  return (
    <>
      <ul className="absolute hidden group-hover:block mt-[3rem] w-[15rem] right-0">
        <div className={`border border-black rounded`}>
          <ProfileNavigationOption link={`/profile`}>
            Lihat Profil
          </ProfileNavigationOption>
          <ProfileNavigationOption link={`/seller`}>
            Toko
          </ProfileNavigationOption>
          <ProfileNavigationOption link={`/profile`} addClass={`hidden`}>
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
