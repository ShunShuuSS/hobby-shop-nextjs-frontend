/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import NotifCancelOrder from "./NotifCancelOrder.Components";
import axios from "axios";
import UserContext from "../../context/user.context";
import { useRouter } from "next/router";
import helper from "../../helper";
import config from "../../../constants/config";

const CardProductTransaction = ({ transaction }) => {
  const [otherButton, setOtherButton] = useState(false);
  const [notifCancel, setNotifCancel] = useState(false);
  const [transactionData, setTransactionData] = useState();

  const [transactionListData, setTransactionListData] = useState([]);
  const [transactionImg, setTransactionImg] = useState("");

  // Helper
  const [transactionStatus, setTransactionStatus] = useState("");
  const [reqCancelSuccess, setReqCancelSuccess] = useState(false);
  const [loadReceiveOrderButton, setLoadReceiveOrderButton] = useState(false);
  const [loadCompleteOrderButton, setLoadCompleteOrderButton] = useState(false);

  // notif
  const [notifReqCancel, setNotifReqCancel] = useState(false);

  const userContext = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    // console.log(transaction.transaction_status);
    setTransactionStatus(transaction.transaction_status);
    if (transaction.transaction_req_cancel == "requested") {
      setNotifReqCancel(true);
    }
  }, []);

  const RequestCancelOrder = async (transaction_id) => {
    try {
      const requestCancelOrder = (
        await axios.post(
          `api/transaction/requestCancelOrder`,
          {
            transaction_id: transaction_id,
          },
          {
            headers: {
              Authorization: `Bearer ${userContext.UserToken}`,
            },
          }
        )
      ).data.data;

      if (requestCancelOrder.affectedRows) {
        setNotifCancel(false);
        setOtherButton(false);
        setNotifReqCancel(true);
      }
    } catch (error) {}
  };

  const CancelOrder = () => {
    setNotifCancel(true);
  };

  const ReceiveOrder = async () => {
    setLoadReceiveOrderButton(true);
    try {
      const update = await axios.post(
        `api/transaction/updateUserTransactionStatus`,
        {
          transaction_id: transaction.transaction_id,
          transaction_status: transaction.transaction_status,
        },
        {
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        }
      );

      if (update.data.data.affectedRows) {
        setTransactionStatus("received");
      }
      setLoadReceiveOrderButton(false);
    } catch (error) {
      console.log("error");
      setLoadReceiveOrderButton(false);
    }
  };

  const CompleteOrder = async () => {
    setLoadCompleteOrderButton(true);
    try {
      const update = await axios.post(
        `api/transaction/updateUserTransactionStatus`,
        {
          transaction_id: transaction.transaction_id,
          transaction_status: transactionStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        }
      );

      if (update.data.data.affectedRows) {
        setTransactionStatus("completed");
      }
      setLoadCompleteOrderButton(false);
    } catch (error) {
      console.log("error");
      setLoadCompleteOrderButton(false);
    }
  };

  return (
    <>
      <div
        className={`w-full h-auto block border rounded-md mb-4`}
        onClick={() => {
          otherButton == true ? setOtherButton(false) : null;
        }}
      >
        <div className={`block m-5`}>
          <div className={`flex justify-between font-bold mb-2`}>
            <div className={`text-[16px]`}>
              {transaction.transaction_store_name}{" "}
              {transaction.transaction_status !== "cancel" ? (
                <>
                  {notifReqCancel ? (
                    <React.Fragment>
                      <span className={`text-red-600`}>
                        ( dalam proses pengajuan pembatalan )
                      </span>
                    </React.Fragment>
                  ) : null}
                </>
              ) : null}
            </div>
            <div className={`text-[14px] text-teal-600`}>
              Nomor Pemesanan : {transaction.transaction_invoice}
            </div>
          </div>

          <div className={`w-full h-full justify-between`}>
            {transaction.transaction_list.map((transList) => (
              <React.Fragment key={transList.transaction_list_id}>
                <div className={`flex mb-3 border rounded-md p-1`}>
                  <div className={`w-[7%] mr-5`}>
                    <img
                      src={
                        config.imageApi +
                        transList.transaction_product_photo +
                        `_150` +
                        `.webp`
                      }
                      className={`w-full rounded-md`}
                      alt=""
                    />
                  </div>
                  <div className={`w-[90%] block relative`}>
                    <div
                      className={`text-[18px] font-bold text-justify break-words whitespace-normal overflow-hidden webkit-box webkit-box-vertical webkit-line-clamp-2 text-ellipsis`}
                    >
                      {transList.transaction_product_name}
                    </div>
                    <div className={`text-[16px]`}>{`Jumlah : ${
                      transList.transaction_quantity
                    } x ${helper.rupiahCurrency(
                      transList.transaction_product_price
                    )}`}</div>
                  </div>
                </div>
              </React.Fragment>
            ))}

            <hr className={`my-3`} />
            <div className={`w-full h-[4rem] flex justify-between`}>
              <div className={`w-[25%] border border-blue-600 rounded-md`}>
                <div className={`m-2 block`}>
                  <div className={`font-bold`}>Total Harga</div>
                  <div>
                    {helper.rupiahCurrency(transaction.transaction_total_price)}
                  </div>
                </div>
              </div>
              <div
                className={`w-[25%] h-[3rem] flex mt-auto border border-blue-600 rounded-md cursor-pointer hover:bg-blue-800 hover:text-white`}
                onClick={() =>
                  router.push(
                    `/detail-transaction/${transaction.transaction_id}`
                  )
                }
              >
                <div className={`flex m-auto`}>Rincian Pesanan</div>
              </div>
              <div className={`w-[25%] border border-blue-600 rounded-md`}>
                <div className={`m-2 block`}>
                  <div className={`font-bold`}>Status</div>
                  <div>
                    {transactionStatus == "pending"
                      ? "Menunggu Konfirmasi Penjual"
                      : transactionStatus == "processed"
                      ? "Pesanan sedang diproses"
                      : transactionStatus == "sent"
                      ? "Pesanan sedang dikirim"
                      : transactionStatus == "received"
                      ? "Pesanan sudah diterima"
                      : transactionStatus == "completed"
                      ? "Pesanan selesai"
                      : transactionStatus == "cancel"
                      ? "Pesanan terbatalkan"
                      : null}
                  </div>
                </div>
              </div>

              {transactionStatus == "sent" ? (
                <>
                  <div
                    className={`
                          flex relative w-[20%] h-[3rem] mt-auto border rounded-md
                          bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                          focus:ring-blue-300 text-white cursor-pointer`}
                    onClick={() => ReceiveOrder()}
                  >
                    {loadReceiveOrderButton ? (
                      <>
                        <div className={`flex m-auto text-center`}>
                          <svg
                            role="status"
                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={`flex m-auto text-center`}>
                          Pesanan diterima
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : null}

              {transactionStatus == "received" ? (
                <>
                  <div
                    className={`
                          flex relative w-[20%] h-[3rem] mt-auto border rounded-md
                          bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                          focus:ring-blue-300 text-white cursor-pointer`}
                    onClick={() => CompleteOrder()}
                  >
                    {loadCompleteOrderButton ? (
                      <>
                        <div className={`flex m-auto text-center`}>
                          <svg
                            role="status"
                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={`flex m-auto text-center`}>
                          Selesaikan pesanan
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : null}

              {transactionStatus == "pending" ||
              transactionStatus == "processed" ? (
                <>
                  <div
                    className={`w-[2.5rem] h-[2.5rem] flex mt-auto border rounded-md
                bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer`}
                    onClick={() => {
                      otherButton === false
                        ? setOtherButton(true)
                        : setOtherButton(false);
                    }}
                  >
                    <img
                      src="/navigationbar/navbar-white.png"
                      className="flex m-auto w-[2rem] h-[2rem]"
                      alt=""
                    />
                  </div>
                </>
              ) : null}
            </div>
            <div className={`flex justify-end`}>
              <div
                className={`absolute ${
                  otherButton == true ? "block" : "hidden"
                } z-50 text-base list-none bg-white rounded
                        divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600
                        hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:text-white cursor-pointer`}
              >
                <div className={`py-1`}>
                  <div
                    className={`block py-2 px-4 text-sm`}
                    onClick={() => CancelOrder(transaction.transaction_id)}
                  >
                    Batalkan pesanan
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          notifCancel == true ? "flex" : "hidden"
        } flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className={`relative p-4 w-full max-w-lg h-full md:h-auto`}>
          <div
            className={`block relative bg-white rounded-lg shadow dark:bg-gray-700 px-5 py-3`}
          >
            <div className={`text-center text-[25px]`}>
              Apakah Anda yakin ingin membatalkan pesanan ini?
            </div>
            {transaction.transaction_list.map((transList) => (
              <React.Fragment key={transList.transaction_list_id}>
                <div className={`flex mb-3 border rounded-md p-1`}>
                  <div className={`w-full block relative`}>
                    <div
                      className={`text-[16px] font-bold text-justify break-words whitespace-normal overflow-hidden webkit-box webkit-box-vertical webkit-line-clamp-2 text-ellipsis`}
                    >
                      {transList.transaction_product_name}
                    </div>
                    <div
                      className={`text-[16px]`}
                    >{`Jumlah : ${transList.transaction_quantity} x Rp${transList.transaction_product_price}`}</div>
                  </div>
                </div>
              </React.Fragment>
            ))}
            <div className={`flex justify-center`}>
              <div className={`w-[50%] border rounded-md text-center`}>
                <div className={`m-1 block`}>
                  <div className={`font-bold`}>Total Harga</div>
                  <div>{`Rp${transaction.transaction_total_price}`}</div>
                </div>
              </div>
            </div>

            <div className={`flex justify-between pt-5`}>
              <button
                className={`border rounded-md p-3 w-[45%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white`}
                onClick={() => setNotifCancel(false)}
              >
                Tidak
              </button>
              <button
                className={`border rounded-md p-3 w-[45%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white`}
                onClick={() => RequestCancelOrder(transaction.transaction_id)}
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProductTransaction;
