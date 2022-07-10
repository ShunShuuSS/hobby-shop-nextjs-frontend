import { useRouter } from "next/router";
import { useState } from "react";
import Tabs from "./Tabs.Components";

const ProfileTab = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <div
        className={`flex rounded-t-md
        ${router.pathname !== "/cart/checkout" ? "h-[3.5rem]" : ""} 
        w-full
        `}
      >
        {router.pathname !== "/cart/checkout" ? (
          <>
            <div onClick={() => router.push(`/profile`)}>
              <Tabs
                addClass={`${
                  router.pathname == `/profile`
                    ? "bg-blue-700 text-white"
                    : "text-black"
                }`}
              >
                Data Pribadi
              </Tabs>
            </div>

            <div onClick={() => router.push(`/profile/address`)}>
              <Tabs
                addClass={`${
                  router.pathname == `/profile/address`
                    ? "bg-blue-700 text-white"
                    : "text-black"
                }`}
              >
                Alamat
              </Tabs>
            </div>
          </>
        ) : null}
      </div>
      <div className={`w-full h-full border border-black rounded-b-md`}>
        <div className={`m-5 h-full`}>{children}</div>
      </div>
    </>
  );
};

export default ProfileTab;
