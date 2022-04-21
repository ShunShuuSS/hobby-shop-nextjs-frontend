import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Tabs = ({ children, addClass }) => {
  return (
    <>
      <div
        id="test"
        className={`h-full border-t border-x w-[10rem] flex text-center text-[17px] hover:bg-gray-300 rounded-t-md cursor-pointer 
        ${addClass}`}
      >
        <div className={`m-auto`}>{children}</div>
      </div>
    </>
  );
};

export default Tabs;
