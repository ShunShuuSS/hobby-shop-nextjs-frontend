/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/cart.context";
import helper from "../../helper";

const CartPriceDetails = () => {
  const cartContext = useContext(CartContext);

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
      <div className={`w-full border border-black rounded-md`}>
        <div className={`m-[1rem_2rem]`}>
          <div className={`font-bold text-[25px] pb-5`}>Rincian Jumlah</div>
          <div className={`flex justify-between`}>
            <div className={``}>Jumlah Produk</div>
            <div className={``}>{totalProduct}</div>
          </div>
          <hr className={`border-black`} />
          <div className={`flex justify-between`}>
            <div className={``}>Total Harga</div>
            <div className={``}>{helper.rupiahCurrency(totalPrice)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPriceDetails;
