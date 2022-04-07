import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import ProfileNavigation from "./ProfileNavigation.Components";
import LoginContext from "../../context/login.context";

const NavigationBar = () => {
  const [profile, setProfile] = useState(false);
  const loginContext = useContext(LoginContext);

  useEffect(() => {
    if (loginContext.UserToken) {
      setProfile(true);
    } else {
      setProfile(false);
    }
  }, [loginContext]);

  return (
    <>
      <div
        className={`h-[3.5rem] fixed flex z-[2] p-[0_10rem] list-none w-full shadow-[2px_2px_10px_#ececec] bg-white`}
      >
        <div className={`m-[auto_0] float-left`}>
          <Link href={`/`}>
            <a className={`text-[25px]`}>HOBBYSHOP</a>
          </Link>
        </div>
        <div className={`m-auto p-[auto]`}>
          <input
            type="text"
            placeholder="cari produk ..."
            className={`border border-gray-400 w-[35vw] h-[2.5rem] rounded-sm text-[15px] px-1`}
          />
          <a href=""></a>
        </div>
        <Link href={`/cart`}>
          <a className={`w-auto float-right m-auto`}>
            <img
              src="/navigationbar/cart.png"
              className={`h-[3rem] w-full float-right`}
              alt=""
            />
          </a>
        </Link>
        <div
          className={`
          ${profile == false ? "" : "hidden"}
          h-[2.5rem] w-[4rem] flex my-auto border rounded-md cursor-pointer`}
        >
          <Link href={`/login`}>
            <a className={`m-auto font-bold text-[18px]`}>Login</a>
          </Link>
        </div>
        <div
          className={`
          ${profile == true ? "" : "hidden"}
          group inline-block relative my-auto cursor-pointer`}
        >
          <Link href={`/`}>
            <a className={`w-auto float-right`}>
              <img
                src="/navigationbar/profile.png"
                className={`h-[3rem] float-right`}
                alt=""
              />
            </a>
          </Link>
          <ProfileNavigation></ProfileNavigation>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
