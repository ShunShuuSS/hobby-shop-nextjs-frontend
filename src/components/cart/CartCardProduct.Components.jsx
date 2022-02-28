import Link from "next/link";

import CardQuantity from "./CartQuantity.Components";

const CartCardProduct = ({
  storeName,
  productImg,
  productName,
  productPrice,
  productQty,
}) => {
  return (
    <>
      <div className={`w-full mb-5 border rounded-md`}>
        <div className={`m-3 flex`}>
          <div className={`w-[2rem] m-auto`}>
            <input
              className={`h-4 w-4 cursor-pointer`}
              type="checkbox"
              value=""
            />
          </div>
          <div className={`w-full block`}>
            <div className={`text-[17px]`}>{storeName}</div>
            <div className={`flex`}>
              <div className={`mr-5 w-[15%]`}>
                <Link href={`/1/1`}>
                  <a>
                    <img
                      src={productImg}
                      className={`w-[8rem] object-cover rounded-md`}
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div className={`block w-[85%] relative`}>
                <div
                  className={`text-[17px] break-words whitespace-normal overflow-hidden webkit-box webkit-box-vertical webkit-line-clamp-1 text-ellipsis`}
                >
                  {productName}
                </div>
                <div className={`text-[18px]`}>{productPrice}</div>
                <div className={`absolute bottom-0 right-0`}>
                  <CardQuantity productQty={productQty}></CardQuantity>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCardProduct;
