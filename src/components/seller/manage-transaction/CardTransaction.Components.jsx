/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import UserContext from "../../../context/user.context";
import helper from "../../../helper";
import moment from "moment";

const CardTransaction = ({ transaction }) => {
  const [otherButton, setOtherButton] = useState(false);
  const [timeCounter, setTimeCounter] = useState({
    days: "",
    hours: "",
    minutes: "",
    seconds: "",
  });

  const [transactionState, setTransactionState] = useState({
    handleTransaction: false,
    loadingTransactionButton: false,
  });

  const router = useRouter();

  const userContext = useContext(UserContext);

  const AcceptTransaction = async () => {
    if (
      moment(transaction.transaction_date_process_limit).toDate() >
      moment().toDate()
    ) {
      try {
        setTransactionState({ loadingTransactionButton: true });
        const acceptTransaction = (
          await axios.post(
            `api/sellerTransaction/updateStatusTransaction`,
            {
              transaction_id: transaction.transaction_id,
              transaction_status: "processed",
            },
            {
              headers: {
                Authorization: `Bearer ${userContext.UserToken}`,
              },
            }
          )
        ).data.data;

        if (acceptTransaction.affectedRows) {
          setTransactionState({
            handleTransaction: true,
            loadingTransactionButton: false,
          });
          // router.reload(window.location.pathname);
        }
      } catch (error) {}
    }
  };

  const sendTransaction = async () => {
    if (
      moment(transaction.transaction_date_send_limit).toDate() >
      moment().toDate()
    ) {
      try {
        setTransactionState({ loadingTransactionButton: true });
        const sendTransaction = (
          await axios.post(
            `api/sellerTransaction/updateStatusTransaction`,
            {
              transaction_id: transaction.transaction_id,
              transaction_status: "sent",
            },
            {
              headers: {
                Authorization: `Bearer ${userContext.UserToken}`,
              },
            }
          )
        ).data.data;

        if (sendTransaction.affectedRows) {
          setTransactionState({
            handleTransaction: true,
            loadingTransactionButton: false,
          });
          // router.reload(window.location.pathname);
        }
      } catch (error) {}
    }
  };

  const completeTransaction = async () => {
    try {
      const completeTransaction = await axios.post(
        `api/sellerTransaction/updateStatusTransaction`,
        {
          transaction_id: transaction.transaction_id,
          transaction_status: "completed",
        },
        {
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        }
      );

      if (completeTransaction.affectedRows) {
        setTransactionState({ handleTransaction: true });
        // router.reload(window.location.pathname);
      }
    } catch (error) {}
  };

  const cancelTransaction = async () => {
    try {
      const cancelTransaction = (
        await axios.post(
          `api/sellerTransaction/updateStatusTransaction`,
          {
            transaction_id: transaction.transaction_id,
            transaction_status: "cancel",
          },
          {
            headers: {
              Authorization: `Bearer ${userContext.UserToken}`,
            },
          }
        )
      ).data.data;

      if (cancelTransaction.affectedRows) {
        setTransactionState({
          handleTransaction: true,
        });
      }
    } catch (error) {}
  };

  const HandleTransactionButton = () => {
    if (transaction.transaction_status == "pending") {
      AcceptTransaction();
    } else if (transaction.transaction_status == "processed") {
      sendTransaction();
    } else if (transaction.transaction_status == "sent") {
      completeTransaction();
    }
  };

  return (
    <>
      {!transactionState.handleTransaction ? (
        <>
          <div className={`w-full h-auto block border rounded-md mb-4`}>
            <div className={`block m-5`}>
              <div className={`flex justify-between font-bold mb-2`}>
                <div className={`text-[14px] text-teal-600`}>
                  Nomor Pemesanan : {transaction.transaction_invoice}
                  {/* {timeCounter.hours +
                ":" +
                timeCounter.minutes +
                ":" +
                timeCounter.seconds} */}
                </div>
                <div className={`text-red-600 text-[15px]`}>
                  {transaction.transaction_status == "pending" &&
                  moment(transaction.transaction_date_process_limit).toDate() >
                    moment().toDate()
                    ? `( Batas proses pukul ${moment(
                        transaction.transaction_date_process_limit
                      ).format("HH:MM, D MMMM YY ")} )`
                    : transaction.transaction_status == "processed" &&
                      moment(transaction.transaction_date_send_limit).toDate() >
                        moment().toDate()
                    ? `( Batas pengiriman ${moment(
                        transaction.transaction_date_send_limit
                      ).format("HH:MM, D MMMM YY ")} )`
                    : transaction.transaction_status == "sent"
                    ? "( Sedang dikirim )"
                    : transaction.transaction_status == "received"
                    ? "( Telah diterima )"
                    : transaction.transaction_status == "completed"
                    ? "( Selesai )"
                    : transaction.transaction_status == "cancel" ||
                      moment(
                        transaction.transaction_date_process_limit
                      ).toDate() < moment().toDate() ||
                      moment(transaction.transaction_date_send_limit).toDate() <
                        moment().toDate()
                    ? "Pesanan terbatalkan"
                    : null}
                </div>
              </div>

              <div className={`w-full h-full justify-between`}>
                {transaction.transaction_list.map((product) => (
                  <React.Fragment key={product.transaction_list_id}>
                    <div className={`flex mb-3 border rounded-md p-1`}>
                      <div className={`w-[7%] mr-2`}>
                        <img
                          src="/test1.jpg"
                          className={`w-full rounded-md`}
                          alt=""
                        />
                      </div>
                      <div className={`w-[90%] block relative`}>
                        <div
                          className={`text-[15px] font-bold text-justify break-words whitespace-normal overflow-hidden webkit-box webkit-box-vertical webkit-line-clamp-2 text-ellipsis`}
                        >
                          {product.transaction_product_name}
                        </div>
                        <div className={`text-[15px]`}>{`Jumlah : ${
                          product.transaction_quantity
                        } x ${helper.rupiahCurrency(
                          product.transaction_product_price
                        )}`}</div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}

                <hr className={`my-3`} />
                <div className={`w-full h-[4rem] flex justify-between`}>
                  <div className={`w-[25%] border rounded-md border-blue-600`}>
                    <div className={`m-2 block`}>
                      <div className={`font-bold`}>Total Harga</div>
                      <div>
                        {helper.rupiahCurrency(
                          transaction.transaction_total_price
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`w-[25%] h-[3rem] border-blue-600 flex mt-auto border rounded-md
                hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:text-white cursor-pointer`}
                    onClick={() =>
                      router.push(
                        `/seller/detail-transaction/${transaction.transaction_id}`
                      )
                    }
                  >
                    <div className={`flex m-auto`}>Rincian Pesanan</div>
                  </div>
                  {transaction.transaction_status == "completed" ||
                  transaction.transaction_status == "cancel" ||
                  (transaction.transaction_status == "pending" &&
                    moment(
                      transaction.transaction_date_process_limit
                    ).toDate() < moment().toDate()) ||
                  (transaction.transaction_status == "processed" &&
                    moment(transaction.transaction_date_send_limit).toDate() <
                      moment().toDate()) ? null : (
                    <>
                      <div
                        className={`
                flex relative w-[20%] h-[3rem] mt-auto border rounded-md
                bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white cursor-pointer`}
                        onClick={() => HandleTransactionButton()}
                      >
                        <div className={`flex m-auto`}>
                          {transactionState.loadingTransactionButton ? (
                            <>
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
                            </>
                          ) : (
                            <>
                              {transaction.transaction_status == "pending"
                                ? "Terima Pesanan"
                                : transaction.transaction_status == "processed"
                                ? "Kirim pesanan"
                                : transaction.transaction_status == "sent"
                                ? "Dalam pengiriman"
                                : null}
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {transaction.transaction_status == "completed" ||
                  transaction.transaction_status == "cancel" ||
                  (transaction.transaction_status == "pending" &&
                    moment(
                      transaction.transaction_date_process_limit
                    ).toDate() < moment().toDate()) ||
                  (transaction.transaction_status == "processed" &&
                    moment(transaction.transaction_date_send_limit).toDate() <
                      moment().toDate()) ? null : (
                    <>
                      <div
                        className={`
                    flex w-[2.5rem] h-[2.5rem] mt-auto border rounded-md
                    bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer`}
                        onClick={() =>
                          otherButton == true
                            ? setOtherButton(false)
                            : setOtherButton(true)
                        }
                      >
                        <img
                          src="/navigationbar/navbar-white.png"
                          className="flex m-auto w-[2rem] h-[2rem]"
                          alt=""
                        />
                      </div>
                    </>
                  )}
                </div>
                {otherButton == true ? (
                  <>
                    <div className={`flex justify-end`}>
                      <div
                        className={`absolute z-50 text-base list-none bg-white rounded
                        divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600
                        `}
                      >
                        <div
                          className={`py-1 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:text-white cursor-pointer`}
                          onClick={() => cancelTransaction()}
                        >
                          <div className={`block py-2 px-4 text-sm`}>
                            Batalkan pesanan
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default CardTransaction;
