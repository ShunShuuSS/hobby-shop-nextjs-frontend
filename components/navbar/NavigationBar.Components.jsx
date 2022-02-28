import React from "react";
import Link from "next/link";
import styles from "../styles/components/Navigation.module.scss";

const NavigationBar = () => {
  return (
    <>
      <div
        className={`fixed flex z-[1] p-[0_10rem] list-none w-full h-[3.5rem] shadow-[2px_2px_10px_#ececec] overflow-hidden bg-white`}
      >
        <div className={`m-[auto_0] float-left`}>
          <Link href={`/`}>
            <a className={`logo`}>HOBBYSHOP</a>
          </Link>
        </div>
        <div className={`m-auto p-[auto]`}>
          <input
            type="text"
            placeholder="cari produk ..."
            className={`border w-[35vw] h-[2.5rem] rounded-sm text-[15px] px-1`}
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
        <Link href={``}>
          <a className={` w-auto my-auto float-right`}>
            <img
              src="/navigationbar/profile.png"
              className={`h-[3rem] float-right`}
              alt=""
            />
          </a>
        </Link>
      </div>
    </>
  );
};

export default NavigationBar;
