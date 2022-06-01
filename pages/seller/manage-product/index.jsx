/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import ProductCard from "../../../src/components/seller/manage-product/ProductCard.Components";
import TabSeller from "../../../src/components/seller/manage-transaction/TabSeller.Components";
import UserContext from "../../../src/context/user.context";
import helper from "../../../src/helper";

const ManageProduct = () => {
  const [productData, setProductData] = useState([]);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.CompleteLoad == true) {
      if (userContext.UserToken !== "") {
        if (userContext.StoreInfo.length === 0) {
          router.push("/seller/register-store");
        }
        getProductData();
      }
    }
  }, [userContext.CompleteLoad]);

  const getProductData = async () => {
    const getProduct = (
      await axios.get("api/sellerProduct/allProductByStoreId", {
        params: {
          store_id: userContext.StoreInfo[0].store_id,
        },
        headers: {
          Authorization: `Bearer ${userContext.UserToken}`,
        },
      })
    ).data.data;
    if (getProduct.length !== 0) {
      setProductData(getProduct);
    }
  };

  return (
    <>
      <TabSeller>
        <div>
          <div className={`flex justify-end`}>
            <Link href={`/seller/add-product`}>
              <a>
                <div
                  className={`w-full block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                >
                  Tambah Produk
                </div>
              </a>
            </Link>
          </div>
          <div className={`my-2`}></div>
          {productData.length ? (
            <>
              {productData.map((product) => (
                <React.Fragment key={product.product_id}>
                  <ProductCard product={product} />
                </React.Fragment>
              ))}
            </>
          ) : (
            <>
              <div
                className={`h-full font-bold text-[20px] flex justify-center top-1/2`}
              >
                Belum ada produk
              </div>
            </>
          )}
        </div>
      </TabSeller>
    </>
  );
};

export default ManageProduct;
