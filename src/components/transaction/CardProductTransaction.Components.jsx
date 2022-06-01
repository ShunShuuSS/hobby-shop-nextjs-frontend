/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import NotifCancelOrder from "./NotifCancelOrder.Components";
import axios from "axios";
import UserContext from "../../context/user.context";
import { useRouter } from "next/router";
import helper from "../../helper";

const CardProductTransaction = ({ transaction }) => {
  const [otherButton, setOtherButton] = useState(false);
  const [notifCancel, setNotifCancel] = useState(false);
  const [transactionData, setTransactionData] = useState({
    ...transaction,
    cancelTransaction: false,
  });
  const [reqCancelSuccess, setReqCancelSuccess] = useState(false);

  const userContext = useContext(UserContext);

  const router = useRouter();

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
        console.log(requestCancelOrder);
        router.reload(window.location.pathname);
        console.log("berhasil request cancel");
      }
    } catch (error) {}
  };

  const CancelOrder = (transaction_id) => {
    setNotifCancel(true);
    console.log(transaction_id);
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
              {transaction.transaction_req_cancel == "requested" ? (
                <React.Fragment>
                  <span className={`text-red-600`}>
                    ( dalam proses pengajuan pembatalan )
                  </span>
                </React.Fragment>
              ) : (
                ""
              )}
            </div>
            <div className={`text-[14px] text-teal-600`}>
              Nomor Pemesanan INV/TANGGAL/RANDOM
            </div>
          </div>

          <div className={`w-full h-full justify-between`}>
            {transaction.transaction_list.map((transList) => (
              <React.Fragment key={transList.transaction_list_id}>
                <div className={`flex mb-3 border rounded-md p-1`}>
                  <div className={`w-[7%] mr-5`}>
                    <img
                      src="/test1.jpg"
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
              >
                <div className={`flex m-auto`}>Rincian Pesanan</div>
              </div>
              <div className={`w-[25%] border border-blue-600 rounded-md`}>
                <div className={`m-2 block`}>
                  <div className={`font-bold`}>Status</div>
                  <div>
                    {transaction.transaction_status == "pending"
                      ? "Menunggu Konfirmasi Penjual"
                      : transaction.transaction_status == "processed"
                      ? "Pesanan sedang diproses"
                      : transaction.transaction_status == "sent"
                      ? "Pesanan sedang dikirim"
                      : transaction.transaction_status == "received"
                      ? "Pesanan sudah diterima"
                      : transaction.transaction_status == "completed"
                      ? "Pesanan selesai"
                      : null}
                  </div>
                </div>
              </div>
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
