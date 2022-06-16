import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Tabs = ({ children, addClass }) => {
  return (
    <>
      <div
        id="test"
        className={`h-full border-black border-t border-x w-[10rem] cursor-pointer flex text-center text-[17px] rounded-t-md  hover:text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
        ${addClass}`}
      >
        <div className={`m-auto`}>{children}</div>
      </div>
    </>
  );
};

export default Tabs;
