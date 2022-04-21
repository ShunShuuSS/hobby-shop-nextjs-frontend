import { useRouter } from "next/router";
import { useState } from "react";
import Tabs from "./Tabs.Components";

const ProfileTab = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <div className={`flex rounded-t-md h-[3.5rem] w-full`}>
        <div onClick={() => router.push(`/profile`)}>
          <Tabs
            addClass={`${router.pathname == `/profile` ? "bg-gray-400" : ""}`}
          >
            Data Pribadi
          </Tabs>
        </div>

        <div onClick={() => router.push(`/profile/address`)}>
          <Tabs
            addClass={`${
              router.pathname == `/profile/address` ? "bg-gray-400" : ""
            }`}
          >
            Alamat
          </Tabs>
        </div>
      </div>
      <div className={`w-full border rounded-b-md`}>
        <div className={`m-5 flex justify-between`}>{children}</div>
      </div>
    </>
  );
};

export default ProfileTab;
