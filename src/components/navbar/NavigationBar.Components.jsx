import React from "react";
import Link from "next/link";
import ProfileNavigation from "./ProfileNavigation.Components";

const NavigationBar = () => {
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
              className={`h-[3rem] float-right`}
              alt=""
            />
          </a>
        </Link>
        <div
          className={`hidden h-[3rem] w-[4rem] flex my-auto border rounded-md cursor-pointer`}
        >
          <div className={`flex m-auto font-bold text-[18px]`}>Login</div>
        </div>
        <div className={`group inline-block relative my-auto cursor-pointer`}>
          <Link href={``}>
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
