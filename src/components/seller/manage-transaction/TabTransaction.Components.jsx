import { useRouter } from "next/router";
import { useState } from "react";
import CardTransaction from "./CardTransaction.Components";

const TabTransaction = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <div className={`flex`}>
        <div className={`flex rounded-sm outline-style-1 bg-white`}>
          <div
            className={`w-[10rem] h-[2.5rem] rounded-l-sm flex m-0
            hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer
              ${
                router.pathname == "/seller/manage-transaction"
                  ? "bg-blue-700 text-white"
                  : ""
              }`}
            onClick={() => router.push("/seller/manage-transaction")}
          >
            <div className={`flex m-auto`}>Semua Pesanan</div>
          </div>
          <div
            className={`w-[10rem] h-[2.5rem] flex
            hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer
              ${
                router.pathname == "/seller/manage-transaction/pending"
                  ? "bg-blue-700 text-white"
                  : ""
              }`}
            onClick={() => router.push("/seller/manage-transaction/pending")}
          >
            <div className={`flex m-auto`}>Pesanan Baru</div>
          </div>
          <div
            className={`w-[10rem] h-[2.5rem] flex
            hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer
              ${
                router.pathname == "/seller/manage-transaction/processed"
                  ? `bg-blue-700 text-white`
                  : ``
              }`}
            onClick={() => router.push("/seller/manage-transaction/processed")}
          >
            <div className={`flex m-auto`}>Pesanan Diproses</div>
          </div>
          <div
            className={`w-[10rem] h-[2.5rem] flex
            hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer
              ${
                router.pathname == "/seller/manage-transaction/sent"
                  ? "bg-blue-700 text-white"
                  : ""
              }`}
            onClick={() => router.push("/seller/manage-transaction/sent")}
          >
            <div className={`flex m-auto`}>Pesanan Dikirim</div>
          </div>
          <div
            className={`w-[10rem] h-[2.5rem] flex
            hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer
              ${
                router.pathname == "/seller/manage-transaction/completed"
                  ? "bg-blue-700 text-white"
                  : ""
              }`}
            onClick={() => router.push("/seller/manage-transaction/completed")}
          >
            <div className={`flex m-auto`}>Pesanan Selesai</div>
          </div>
          <div
            className={`w-[10rem] h-[2.5rem] rounded-r-sm flex
            hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer
              ${
                router.pathname == "/seller/manage-transaction/cancel"
                  ? "bg-blue-700 text-white"
                  : ""
              }`}
            onClick={() => router.push("/seller/manage-transaction/cancel")}
          >
            <div className={`flex m-auto`}>Pesanan Batal</div>
          </div>
        </div>
      </div>
      <hr className={`border-gray-400 mb-2`} />
      {/* <div className={`my-2`}>
        <input
          type="text"
          className={`h-[2rem] p-1 border rounded-md border-gray-400`}
          value={`asdf`}
        />
      </div> */}
      <div className={`block`}>{children}</div>
    </>
  );
};

export default TabTransaction;
