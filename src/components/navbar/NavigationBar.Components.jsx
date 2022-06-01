/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import ProfileNavigation from "./ProfileNavigation.Components";
import UserContext from "../../context/user.context";
import { useRouter } from "next/router";
import { checkCookies } from "cookies-next";

const NavigationBar = () => {
  const [profile, setProfile] = useState(false);
  const [navigationHide, setNavigationHide] = useState(false);

  const [loadingProfileComplete, setLoadingProfileComplete] = useState(false);

  const userContext = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/register" || router.pathname === "/login") {
      setNavigationHide(true);
    } else {
      setNavigationHide(false);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (checkCookies("user_token") == false) {
      setLoadingProfileComplete(true);
    } else {
      if (userContext.CompleteLoad === true) {
        if (userContext.UserToken !== "") {
          setProfile(true);
          setLoadingProfileComplete(true);
        } else {
          setLoadingProfileComplete(true);
          setProfile(false);
        }
      }
    }
  }, [userContext.CompleteLoad]);

  const loadNavigation = () => {
    setProfile(true);
    setLoadingProfileComplete(true);
  };

  return (
    <>
      <div
        className={`h-[3.5rem] fixed flex z-[2] p-[0_10rem] list-none w-full border-b border-neutral-400 shadow-[2px_2px_10px_#ececec] bg-white`}
      >
        <div className={`m-[auto_0] float-left`}>
          <Link href={`/`}>
            <a className={`text-[25px]`}>HOBBYSHOP</a>
          </Link>
        </div>
        <div className={`${navigationHide ? "hidden" : ""}`}></div>
        <div className={`${navigationHide ? "hidden" : ""} m-auto p-[auto]`}>
          <input
            type="text"
            placeholder="cari produk ..."
            className={`border border-gray-400 w-[35vw] h-[2.5rem] rounded-sm text-[15px] px-1`}
          />
          <a href=""></a>
        </div>
        <div
          className={`w-auto float-right m-auto cursor-pointer ${
            navigationHide ? "hidden" : ""
          }`}
        >
          <Link href={`/cart`}>
            <a>
              <img
                src="/navigationbar/cart.png"
                className={`h-[3rem] w-full float-right`}
                alt=""
              />
            </a>
          </Link>
        </div>
        {/* <div class="animate-pulse flex space-x-4 group relative my-auto">
          <div class="rounded-full bg-slate-200 h-[2.5rem] w-[2.5rem]"></div>
        </div> */}

        {loadingProfileComplete ? (
          <>
            {profile ? (
              <>
                {navigationHide ? null : (
                  <>
                    <div
                      className={`w-[3rem] h-[3rem]
                group inline-block relative my-auto cursor-pointer`}
                    >
                      <a className={`w-auto float-right`}>
                        <img
                          src="/navigationbar/profile.png"
                          className={`w-full h-full float-right`}
                          alt=""
                        />
                      </a>

                      <ProfileNavigation></ProfileNavigation>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {navigationHide ? null : (
                  <>
                    <div
                      className={`
                ${navigationHide ? "hidden" : ""}
                h-[2.5rem] w-[4rem] flex my-auto border rounded-md cursor-pointer`}
                    >
                      <Link href={`/login`}>
                        <a className={`m-auto font-bold text-[18px]`}>Login</a>
                      </Link>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-200 w-[2.5rem] h-[2.5rem] my-auto"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavigationBar;
