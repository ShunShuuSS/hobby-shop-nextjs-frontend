import axios from "axios";
import { checkCookies, removeCookies } from "cookies-next";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user.context";
import ProfileNavigationOption from "./ProfileNavigationOption.Components";
const ProfileNavigation = () => {
  const [userData, setUserData] = useState([]);
  const [checkUserStore, setCheckUserStore] = useState(true);

  const userContext = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (checkCookies("user_token") == false) {
      router.push("/login");
    }
  }, []);

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

  return (
    <>
      <ul className="absolute hidden group-hover:block mt-[3rem] w-[15rem] right-0">
        <div className={`border border-black rounded`}>
          <ProfileNavigationOption link={`/profile`}>
            Lihat Profil
          </ProfileNavigationOption>
          <ProfileNavigationOption
            link={`/seller`}
            addClass={`${checkUserStore ? "" : "hidden"}`}
          >
            Toko
          </ProfileNavigationOption>
          <ProfileNavigationOption
            link={`/seller`}
            addClass={`${checkUserStore == false ? "" : "hidden"}`}
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
