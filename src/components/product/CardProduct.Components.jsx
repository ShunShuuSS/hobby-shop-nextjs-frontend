/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import config from "../../../constants/config";
import helper from "../../helper";

const CardProduct = ({
  product_id,
  store_id,
  product_img,
  product_name,
  product_price,
  product_rating,
  openModalFormnotif,
  setOpenModalAddToCart,
}) => {
  const [loadImageComplete, setLoadImageComplete] = useState(false);
  const [image, setImage] = useState("");

  const router = useRouter();

  useEffect(() => {
    loadImage();
  }, []);

  const loadImage = () => {
    setLoadImageComplete(false);
    if (product_img !== null) {
      setImage(config.imageApi + product_img + `_300` + `.webp`);
    } else {
      setImage("/no-image.png");
    }
    setLoadImageComplete(true);
  };

  const onclickProduct = () => {
    if (setOpenModalAddToCart) {
      setOpenModalAddToCart(false);
    }
    router.push(`/${store_id}/${product_id}`);
  };

  return (
    <>
      <a onClick={onclickProduct}>
        <div className={`shadow-md h-[16rem] rounded bg-white cursor-pointer`}>
          <div className={`h-[8rem] relative`}>
            {loadImageComplete ? (
              <>
                <img
                  src={image}
                  className={`object-cover h-full rounded-t-md w-full`}
                  alt=""
                />
              </>
            ) : (
              <>
                <svg
                  role="status"
                  className="w-[20%] h-[20%] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 absolute top-[40%] left-[40%]"
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
            )}
          </div>

          <div className={`m-1`}>
            <div
              className={`text-[13px] break-words whitespace-normal overflow-hidden webkit-box webkit-box-vertical webkit-line-clamp-2 text-ellipsistle`}
              title={product_name}
            >
              {product_name}
            </div>
            <div className={`text-[16px]`}>
              {helper.rupiahCurrency(product_price)}
            </div>
            <div className={`text-[12px]`}>Lokasi</div>
            <div className={`text-[12px]`}>
              {product_rating == 0 ? "Belum ada rating" : product_rating}
            </div>
          </div>
        </div>
      </a>
    </>
  );
};

export default CardProduct;
