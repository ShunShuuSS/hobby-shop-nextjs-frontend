import { useState } from "react";

const CardQuantity = ({ productQty }) => {
  const [product, setProduct] = useState({
    qty: 1,
  });

  const minusQty = () => {
    if (product.qty <= 1) return;
    setProduct({ qty: product.qty - 1 });
  };

  const plusQty = () => {
    if (product.qty >= productQty) return;
    setProduct({ qty: product.qty + 1 });
  };
  return (
    <>
      <div className={`flex border rounded-md w-[8rem] h-[2.5rem] `}>
        <div
          className={`flex items-center h-full w-[2.5rem] ${
            product.qty <= 1 ? "bg-gray-200" : ""
          } `}
          onClick={() => minusQty()}
        >
          <img
            src="cart/minus.png"
            className={`h-[1.5rem] w-[1.5rem] m-auto cursor-pointer`}
            alt=""
          />
        </div>
        <div className={`h-full w-[3rem] border m-auto p-[3px]`}>
          <div className={`text-[20px] text-center`}>{product.qty}</div>
        </div>
        <div
          className={`flex items-center w-[2.5rem] ${
            product.qty >= productQty ? "bg-gray-200" : ""
          }`}
          onClick={() => plusQty()}
        >
          <img
            src="cart/plus.png"
            className={`h-[1.5rem] w-[1.5rem] m-auto cursor-pointer`}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default CardQuantity;
