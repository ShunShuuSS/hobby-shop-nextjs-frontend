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
  const [searchNavigationHide, setSearchNavigationHide] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [loadingProfileComplete, setLoadingProfileComplete] = useState(false);

  const userContext = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== "") {
      if (router.pathname === "/register" || router.pathname === "/login") {
        setNavigationHide(true);
      } else {
        setNavigationHide(false);
        if (router.pathname.substring(0, "/seller".length) === "/seller") {
          setSearchNavigationHide(true);
        } else {
          setSearchNavigationHide(false);
          if (router.pathname === `/search`) {
            if (
              router.asPath.substring(0, "/search?sv=".length) === "/search?sv="
            )
              setSearchInput(
                router.asPath.substring(
                  "/search?sv=".length,
                  router.asPath.length
                )
              );
          }
        }
      }
    }
  }, [router.pathname]);

  useEffect(() => {
    setLoadingProfileComplete(false);
    if (checkCookies("user_token") == false) {
      setLoadingProfileComplete(true);
    } else {
      if (userContext.CompleteLoad === true) {
        if (userContext.UserToken !== "") {
          setProfile(true);
          setLoadingProfileComplete(true);
        }
      }
    }
  }, [userContext.CompleteLoad]);

  const searching = (e) => {
    if (e.key === "Enter") {
      if (searchInput !== "") {
        router.push({
          pathname: "/search",
          query: { sv: searchInput },
        });
      }
    }
  };

  const searchingButton = () => {
    if (searchInput !== "") {
      router.push({
        pathname: "/search",
        query: { sv: searchInput },
      });
    }
  };

  return (
    <>
      <div
        className={`h-[3.5rem] fixed flex justify-between z-[2] p-[0_10rem] list-none w-full border-b border-neutral-400 shadow-[2px_2px_10px_#ececec] bg-white`}
      >
        <div className={`m-[auto_0] float-left`}>
          <Link href={`/`}>
            <a className={`text-[25px]`}>HOBBYSHOP</a>
          </Link>
        </div>
        <div className={`${navigationHide ? "hidden" : ""}`}></div>

        {navigationHide ? null : (
          <>
            {searchNavigationHide ? null : (
              <>
                <div className={`m-auto p-[auto]`}>
                  <div className="flex justify-center">
                    <div className="xl:w-[27rem]">
                      <div className="input-group relative flex items-stretch w-full">
                        <input
                          type="search"
                          className="form-control relative min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="button-addon2"
                          onChange={(e) => setSearchInput(e.target.value)}
                          onKeyDown={(e) => searching(e)}
                          value={searchInput}
                        />
                        <button
                          className="btn px-6 py-2.5 bg-blue-700 text-white font-medium text-xs leading-tight uppercase rounded-r shadow-md hover:bg-blue-800 hover:shadow-lg focus:bg-blue-800  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                          type="button"
                          id="button-addon2"
                          onClick={searchingButton}
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="search"
                            className="w-4"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        <div className={`flex justify-between w-[15rem]`}>
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
                          <a className={`m-auto font-bold text-[18px]`}>
                            Login
                          </a>
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
      </div>
    </>
  );
};

export default NavigationBar;
