import axios from "axios";
import { checkCookies } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CartContext from "../src/context/cart.context";
import UserContext from "../src/context/user.context";
import helper from "../src/helper";

const CheckOutPage = () => {
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserContext);

  const [productData, setProductData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);

  const router = useRouter();

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
      CheckedProductInCartDataApi();
    }
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
          console.log(getData);

          var totalPrice = 0;
          var totalProduct = 0;
          getData.forEach((element) => {
            totalPrice += element.cart_quantity * element.product_price;
            totalProduct += element.cart_quantity;
          });
          setTotalPrice(totalPrice);
          setTotalProduct(totalProduct);
        }
      } catch (error) {}
    }
  };

  const AddNewTransaction = async () => {
    try {
      console.log("coba masukin data transaksi baru");
      const addNewTransaction = (
        await axios.post(
          `api/transaction/addNewTransaction`,
          {
            transaction_total_price: totalPrice,
            sender_address: "evelin",
            receiver_address: "steven",
            transaction_list_product: productData,
          },
          {
            headers: {
              Authorization: `Bearer ${userContext.UserToken}`,
            },
          }
        )
      ).data.data;
      console.log(addNewTransaction);
      if (addNewTransaction.affectedRows) {
        console.log("berhasil masukin transaksi baru");
        // router.push("/transaction");
      }
    } catch (error) {}
  };

  const HandleSubmitTransaction = () => {
    console.log("bayar");
    AddNewTransaction();
  };
  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <div className={`w-auto flex justify-between`}>
        <div className={`w-[65%]`}>
          <div className={``}>
            <div className={`text-[20px] font-bold`}>Alamat</div>
            <div className={``}>alamat alamat alamat</div>
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
