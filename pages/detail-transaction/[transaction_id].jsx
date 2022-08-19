/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../src/context/user.context";
import { checkCookies } from "cookies-next";
import moment from "moment";
import helper from "../../src/helper";

const DetailTransaction = () => {
  const [transactionData, setTransactionData] = useState([]);
  const router = useRouter();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (checkCookies("user_token") == false) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (userContext.CompleteLoad == true) {
      if (userContext.UserToken === "") {
        router.push("login");
      }

      transactionById();
    }
  }, [userContext.CompleteLoad]);

  const transactionById = async () => {
    try {
      const transaction = (
        await axios.get(`api/transaction/transactionById`, {
          params: {
            transaction_id: router.query.transaction_id,
          },
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data[0];
      if (transaction.length !== 0) {
        setTransactionData(transaction);
      }
    } catch (error) {}
  };
  return (
    <>
      <button
        className={`flex w-[15rem] h-[3rem] mt-auto border rounded-md bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
          focus:ring-blue-300 text-white cursor-pointer`}
        onClick={() => router.push("/transaction")}
      >
        <div className={`m-auto`}>Kembali ke halaman transaksi</div>
      </button>

      <hr className={`my-3 border-black`} />
      {transactionData.length !== 0 ? (
        <>
          <div className={`block w-full h-full`}>
            <div className={`w-full flex`}>
              <div className={`w-[10rem]`}>
                Nomor Pemesanan<span className={`float-right`}>:&nbsp;</span>
              </div>
              <div className={`w-auto font-bold`}>
                {transactionData.transaction_invoice}
              </div>
            </div>

            <div className={`flex justify-between`}>
              <div className={`w-auto flex`}>
                <div className={`w-[10rem]`}>
                  Penjual<span className={`float-right`}>:&nbsp;</span>
                </div>
                <div
                  className={`w-auto break-words whitespace-normal overflow-hidden webkit-box webkit-box-vertical text-ellipsis`}
                >
                  {transactionData.transaction_store_name}
                </div>
              </div>

              <div className={`w-[30rem] h-full`}>
                {/* <div className={`w-full flex justify-between`}>
                  <div className={`w-[10rem]`}>
                    Pembeli<span className={`float-right`}>:&nbsp;</span>
                  </div>
                  <div
                    className={`w-[20rem] break-words whitespace-normal overflow-hidden webkit-box webkit-box-vertical text-ellipsis`}
                  >
                    {transactionData.receiver_name}
                  </div>
                </div> */}
                <div className={`w-full flex justify-between`}>
                  <div className={`w-[10rem]`}>
                    Tanggal Pembelian
                    <span className={`float-right`}>:&nbsp;</span>
                  </div>
                  <div className={`w-[20rem]`}>
                    {moment(transactionData.transaction_date).format(
                      "dddd, D MMMM YYYY"
                    )}
                  </div>
                </div>
                <div className={`w-full flex justify-between`}>
                  <div className={`w-[10rem]`}>
                    Alamat Pengiriman
                    <span className={`float-right`}>:&nbsp;</span>
                  </div>
                  <div
                    className={`w-[20rem] break-words whitespace-normal overflow-hidden webkit-box webkit-box-vertical text-ellipsis`}
                  >
                    <span>
                      {transactionData.receiver_name}{" "}
                      <span>({transactionData.receiver_phone})</span>
                    </span>
                    <div className={`text-justify`}>
                      {transactionData.receiver_address}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className={`my-3 w-full border-black`} />
            <div className={`flex justify-between`}>
              <div className={`w-[50%]`}>Informasi Produk</div>
              <div className={`w-[10%] text-right`}>Jumlah</div>
              <div className={`w-[15%] text-right`}>Harga Satuan</div>
              <div className={`w-[20%] text-right`}>Total Harga</div>
            </div>
            <hr className={`my-3 border-black`} />
            <div className={`block`}>
              {transactionData.transaction_list.map((product) => (
                <React.Fragment key={product.transaction_list_id}>
                  <div className={`flex justify-between`}>
                    <div
                      className={`w-[50%] break-words whitespace-normal overflow-hidden webkit-box webkit-box-vertical text-ellipsis`}
                    >
                      <Link href={`/1/1`}>
                        <a>
                          <div className={``}>
                            {product.transaction_product_name}
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className={`w-[10%] text-right`}>
                      {product.transaction_quantity}
                    </div>
                    <div className={`w-[15%] text-right`}>
                      {helper.rupiahCurrency(product.transaction_product_price)}
                    </div>
                    <div className={`w-[20%] text-right`}>
                      {helper.rupiahCurrency(
                        product.transaction_quantity *
                          product.transaction_product_price
                      )}
                    </div>
                  </div>
                </React.Fragment>
              ))}

              <hr className={`my-3 border-black`} />
            </div>
            <div className={`flex justify-end`}>
              <div className={`w-[10rem] font-bold`}>Ongkos</div>
              <div className={`w-[15rem] text-right`}>
                {helper.rupiahCurrency(transactionData.ongkos)}
              </div>
            </div>
            <div className={`flex justify-end`}>
              <div className={`w-[10rem] font-bold`}>Total Transaksi</div>
              <div className={`w-[15rem] text-right`}>
                {helper.rupiahCurrency(transactionData.transaction_total_price)}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default DetailTransaction;
