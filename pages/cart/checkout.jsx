/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { checkCookies } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CustomNotification from "../../src/components/notification/CustomNotification.Components";
import CartContext from "../../src/context/cart.context";
import UserContext from "../../src/context/user.context";
import helper from "../../src/helper";
import AddressPage from "../profile/address";

const CheckOutPage = () => {
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserContext);

  const [productData, setProductData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [notifOrder, setNotifOrder] = useState({
    success: false,
    error: false,
  });

  // helper
  const [modalOpenAddress, setModalOpenAddress] = useState(false);
  const [notifAddressIsNull, setNotifAddressIsNull] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   if (checkCookies("user_token") == false) {
  //     router.push("/login");
  //   }
  // }, []);

  useEffect(() => {
    if (checkCookies("user_token") === false) {
      router.push("/login");
    } else {
      if (userContext.CompleteLoad === true) {
        if (userContext.UserToken !== "") {
          CheckedProductInCartDataApi();
        } else {
          router.push("/login");
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.CompleteLoad]);

  const CheckedProductInCartDataApi = async () => {
    if (userContext.UserToken) {
      try {
        const getData = (
          await axios.get(`api/cart/getCheckedProductInCart`, {
            headers: {
              Authorization: `Bearer ${userContext.UserToken}`,
            },
          })
        ).data.data;

        if (getData.length) {
          setProductData(getData);

          var totalPrice = 0;
          var totalProduct = 0;
          getData.forEach((element) => {
            totalPrice += element.cart_quantity * element.product_price;
            totalProduct += element.cart_quantity;
          });
          setTotalPrice(totalPrice);
          setTotalProduct(totalProduct);
        }
      } catch (error) {
        setNotifOrder({ error: true });
      }
    }
  };

  const AddNewTransaction = async () => {
    try {
      const addNewTransaction = (
        await axios.post(
          `api/transaction/addNewTransaction`,
          {
            transaction_total_price: totalPrice,
            transaction_list_product: productData,
            receiver_name: userContext.UserInfo.receiver_name,
            receiver_phone: userContext.UserInfo.phone_number,
            receiver_address: userContext.UserInfo.user_address_detail.concat(
              ", ",
              userContext.UserInfo.kelurahan_name,
              ", ",
              userContext.UserInfo.kecamatan_name,
              ", ",
              userContext.UserInfo.kabupaten_name,
              ", ",
              userContext.UserInfo.provinsi_name,
              ", ",
              userContext.UserInfo.postal_code
            ),
          },
          {
            headers: {
              Authorization: `Bearer ${userContext.UserToken}`,
            },
          }
        )
      ).data.data;

      if (addNewTransaction.affectedRows) {
        setNotifOrder({ success: true });
        // router.push("/transaction");
      }
    } catch (error) {
      setNotifOrder({ error: true });
    }
  };

  const HandleSubmitTransaction = async () => {
    if (validationTransaction()) {
      await AddNewTransaction();
    }
  };

  const validationTransaction = () => {
    let transactionIsValid = true;

    if (userContext.UserInfo.user_id_address === null || "") {
      setNotifAddressIsNull(true);
      transactionIsValid = false;
    } else {
      setNotifAddressIsNull(false);
    }

    return transactionIsValid;
  };

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>

      <CustomNotification
        show={notifOrder.success}
        text={"Transaksi Berhasil"}
        goToRouteText={"ke halaman daftar transaksi"}
        goToRoute={"/transaction"}
      />
      <CustomNotification
        show={notifOrder.error}
        text={"Terjadi kesalahan"}
        goToRouteText={"kembali kehalaman keranjang"}
        goToRoute={"/cart"}
      />
      <div className={`w-auto flex justify-between`}>
        <div className={`w-[65%]`}>
          <div className={`flex justify-between`}>
            <div className={`block`}>
              <div className={`text-[25px] font-bold`}>Alamat</div>
              {userContext.UserInfo.user_id_address !== null ? (
                <>
                  <div className={`border rounded-md w-[40rem] p-3`}>
                    <div className={`text-[17px] font-bold`}>
                      {userContext.UserInfo.receiver_name}{" "}
                      <span>({userContext.UserInfo.phone_number})</span>
                    </div>
                    <div className={`text-[16px]`}>
                      {userContext.UserInfo.user_address_detail},{" "}
                      {userContext.UserInfo.kelurahan_name},{" "}
                      {userContext.UserInfo.kecamatan_name},{" "}
                      {userContext.UserInfo.kabupaten_name},{" "}
                      {userContext.UserInfo.provinsi_name}
                    </div>
                    <div>Kode Pos : {userContext.UserInfo.postal_code}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className={`text-red-600`}>Belum ada alamat.</div>
                </>
              )}

              {notifAddressIsNull ? (
                <>
                  <div className={`text-red-600`}>
                    Buat atau pilih alamat terlebih dahulu.
                  </div>
                </>
              ) : null}
            </div>

            <div
              className={`text-[15px] my-auto font-bold text-blue-700 hover:text-blue-800 cursor-pointer`}
              onClick={(e) => setModalOpenAddress(true)}
            >
              Pilih alamat
            </div>
            {modalOpenAddress ? (
              <>
                <div
                  className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
                  style={{ backgroundColor: "rgba(128, 128, 128, 0.5)" }}
                >
                  <div className="relative p-4 w-full max-w-7xl h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <div className="flex justify-end p-2">
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                          onClick={() => setModalOpenAddress(false)}
                        >
                          <svg className="w-5 h-5">
                            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                          </svg>
                        </button>
                      </div>
                      <div className="overflow-y-auto max-h-[90vh] px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
                        <AddressPage></AddressPage>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <hr className={`border-black mt-5`} />
          <div className={`block`}>
            <div className={``}>
              {productData.map((product) => (
                <div key={product.cart_id}>
                  <div className={`block mt-5`}>
                    <div>{product.store_name}</div>
                    <div className={`flex`}>
                      <div className={`w-[15%] mr-5`}>
                        <img
                          src={`/test1.jpg`}
                          className={`w-[8rem] object-cover rounded-md`}
                          alt=""
                        />
                      </div>
                      {/* <img src={`/test1.jpg`} alt="" /> */}
                      <div className={`w-[80%] block`}>
                        <div className={`text-[18px] font-bold`}>
                          {product.product_name}
                        </div>
                        <div className={`flex mb-5`}>
                          <div className={`border rounded-md w-[30%] mr-5`}>
                            <div className={`m-1 flex`}>
                              <span className={`font-bold`}>
                                Jumlah :&nbsp;
                              </span>
                              {product.cart_quantity}
                            </div>
                          </div>
                          <div className={`border rounded-md w-[45%]`}>
                            <div className={`m-1`}>
                              <div className={`flex`}>
                                <span className={`font-bold`}>
                                  Harga Satuan :&nbsp;
                                </span>
                                {helper.rupiahCurrency(product.product_price)}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className={`border rounded-md w-[30%]`}>
                          <div className={`m-1 block`}>
                            <div className={`font-bold`}>Total Harga</div>
                            <div>
                              {helper.rupiahCurrency(
                                product.cart_quantity * product.product_price
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className={`border-black mt-5`} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* bagian total harga */}
        <div className={`w-[30%] block`}>
          <div className={`w-full border rounded-md`}>
            <div className={`m-[1rem_2rem]`}>
              <div className={`font-bold text-[25px] pb-5`}>
                Total Pembayaran
              </div>
              <div className={`flex justify-between`}>
                <div className={``}>Jumlah Produk</div>
                <div className={``}>{totalProduct}</div>
              </div>
              <hr />
              <div className={`flex justify-between`}>
                <div className={``}>Total Harga</div>
                <div className={``}>{helper.rupiahCurrency(totalPrice)}</div>
              </div>
            </div>
          </div>
          <div className={`flex float-right mt-5`}>
            <div
              className={`border rounded-md p-[0.6rem_4rem] cursor-pointer`}
              onClick={HandleSubmitTransaction}
            >
              Bayar
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutPage;
