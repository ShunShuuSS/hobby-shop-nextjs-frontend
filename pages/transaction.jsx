/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { checkCookies } from "cookies-next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CardProductTransaction from "../src/components/transaction/CardProductTransaction.Components";
import ModalRating from "../src/components/transaction/ModalRating.Components";
import UserContext from "../src/context/user.context";

const TransactionPage = () => {
  const [transactionData, setTransactionData] = useState([]);

  const [openDropDown, setOpenDropDown] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState("");
  const [transactionStatusView, setTransactionStatusView] = useState(
    "Semua status pesanan"
  );

  const userContext = useContext(UserContext);
  const router = useRouter();

  // Rating Value
  // const [ratingValue, setRatingValue] = useState(0);

  // useEffect(() => {
  //   console.log(ratingValue);
  // }, [ratingValue]);

  // End of Rating Value

  useEffect(() => {
    if (checkCookies("user_token") == false) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (userContext.CompleteLoad == true) {
      if (userContext.UserToken === "") {
        router.push(`/login`);
      }
      if (transactionStatus === "") {
        getUserAllTransaction();
      }
    }
  }, [userContext.CompleteLoad, transactionStatus]);

  useEffect(() => {
    if (transactionStatus !== "") {
      getUserTransactionByStatus();
    }
  }, [transactionStatus]);

  const getUserAllTransaction = async () => {
    try {
      const userAllTransaction = (
        await axios.get("api/transaction/getAllTransactionByUserId", {
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;

      setTransactionData(userAllTransaction);
    } catch (error) {
      console.log("error");
    }
  };

  const getUserTransactionByStatus = async () => {
    try {
      const userTransaction = (
        await axios.get("api/transaction/getUserTransactionByStatus", {
          params: {
            transaction_status: transactionStatus,
          },
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;

      setTransactionData(userTransaction);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      {/* <ModalRating setRatingValue={setRatingValue} /> */}
      <div className={`mobile-s:block mobile-xl:flex justify-end`}>
        <div className={`my-auto mr-5 font-bold`}>Status Pesanan</div>
        <div className={`block`}>
          <button
            id="dropdownDefault"
            data-dropdown-toggle="dropdown"
            className="w-52 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={() =>
              openDropDown ? setOpenDropDown(false) : setOpenDropDown(true)
            }
          >
            <div className={`flex`}>
              {transactionStatusView}
              <svg
                className="w-4 h-4 ml-2 my-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </button>
          {openDropDown ? (
            <>
              <div
                id="dropdown"
                className="z-10 absolute bg-white divide-y divide-gray-100 rounded shadow w-48 dark:bg-gray-700"
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefault"
                >
                  <li
                    onClick={() => {
                      setTransactionStatusView("Semua status pesanan");
                      setOpenDropDown(false);
                      setTransactionStatus("");
                    }}
                  >
                    <a className="block px-4 py-2 hover:bg-blue-700 hover:text-white">
                      Semua status pesanan
                    </a>
                  </li>
                  <li
                    onClick={() => {
                      setTransactionStatusView("Belum diproses");
                      setOpenDropDown(false);
                      setTransactionStatus("pending");
                    }}
                  >
                    <a className="block px-4 py-2 hover:bg-blue-700 hover:text-white">
                      Belum diproses
                    </a>
                  </li>
                  <li
                    onClick={() => {
                      setTransactionStatusView("Sudah diproses");
                      setOpenDropDown(false);
                      setTransactionStatus("processed");
                    }}
                  >
                    <a className="block px-4 py-2 hover:bg-blue-700 hover:text-white">
                      Sudah diproses
                    </a>
                  </li>
                  <li
                    onClick={() => {
                      setTransactionStatusView("Sedang dikirim");
                      setOpenDropDown(false);
                      setTransactionStatus("sent");
                    }}
                  >
                    <a className="block px-4 py-2 hover:bg-blue-700 hover:text-white">
                      Sedang dikirim
                    </a>
                  </li>
                  <li
                    onClick={() => {
                      setTransactionStatusView("Pesanan sudah diterima");
                      setOpenDropDown(false);
                      setTransactionStatus("received");
                    }}
                  >
                    <a className="block px-4 py-2 hover:bg-blue-700 hover:text-white">
                      Pesanan sudah diterima
                    </a>
                  </li>
                  <li
                    onClick={() => {
                      setTransactionStatusView("Pesanan selesai");
                      setOpenDropDown(false);
                      setTransactionStatus("completed");
                    }}
                  >
                    <a className="block px-4 py-2 hover:bg-blue-700 hover:text-white">
                      Pesanan selesai
                    </a>
                  </li>
                  <li
                    onClick={() => {
                      setTransactionStatusView("Pesanan batal");
                      setOpenDropDown(false);
                      setTransactionStatus("cancel");
                    }}
                  >
                    <a className="block px-4 py-2 hover:bg-blue-700 hover:text-white">
                      Pesanan batal
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className={`py-3`} />
      <div className={`w-auto`}>
        {transactionData.length !== 0 ? (
          <>
            {transactionData.map((transaction, i) => (
              <React.Fragment key={transaction.transaction_id}>
                <CardProductTransaction transaction={transaction} />
              </React.Fragment>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
};

export default TransactionPage;
