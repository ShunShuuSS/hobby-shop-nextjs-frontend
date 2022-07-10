/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/cart.context";
import helper from "../../helper";

const CartPriceDetails = () => {
  const cartContext = useContext(CartContext);
  const router = useRouter();

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);

  useEffect(() => {
    _setPrice();
  }, [
    cartContext.ListOfCheckedProduct ||
      cartContext.TotalPrice ||
      cartContext.TotalProduct,
  ]);

  const _setPrice = () => {
    setTotalPrice(cartContext.TotalPrice);
    setTotalProduct(cartContext.TotalProduct);
  };

  return (
    <>
      <div
        className={`w-full mobile-s:border-t mobile-s:border-b laptop:border border-black mobile-s:rounded-t-md laptop:rounded-md mobile-s:bg-white laptop:bg-[#f7eabc]`}
      >
        <div
          className={`m-[1rem_1rem] mobile-s:block mobile-s:relative mobile-s:justify-between laptop:block`}
        >
          <div className={`w-auto`}>
            <div className={`font-bold text-[25px] mobile-s:mb-2 laptop:mb-5`}>
              Rincian Jumlah
            </div>
            <div
              className={`flex justify-between mobile-s:font-bold mobile-s:text-[18px] laptop:font-normal laptop:text-base`}
            >
              <div className={``}>Jumlah Produk</div>
              <div className={``}>{totalProduct}</div>
            </div>
            <hr className={`border-black`} />
            <div
              className={`flex justify-between mobile-s:font-bold mobile-s:text-[18px] laptop:font-normal laptop:text-base`}
            >
              <div className={``}>Total Harga</div>
              <div className={``}>{helper.rupiahCurrency(totalPrice)}</div>
            </div>
          </div>

          <div
            className={`mt-2 flex mobile-s:justify-end mobile-s:bottom-0 mobile-s:right-0 tablet:static`}
          >
            <button
              className={`laptop:w-full border rounded-md p-[0.6rem_2rem] ${
                cartContext.TotalPrice === 0
                  ? "bg-blue-700/80 text-white/30"
                  : "bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
              }`}
              onClick={() => router.push("/cart/checkout")}
              disabled={cartContext.TotalPrice === 0 ? true : false}
            >
              Check out sekarang
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPriceDetails;
