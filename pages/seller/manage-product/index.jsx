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
      await axios.get("api/product/productByStoreId", {
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
            <div
              className={`flex border rounded-md h-[2.5rem] bg-blue-700 text-white hover:bg-blue-800 cursor-pointer`}
            >
              <Link href={`/seller/add-product`}>
                <div className={`mx-3 my-auto`}>Tambah Produk</div>
              </Link>
            </div>
          </div>
          <div className={`my-2`}></div>
          {productData.map((product) => (
            <React.Fragment key={product.product_id}>
              <ProductCard product={product} />
            </React.Fragment>
          ))}
        </div>
      </TabSeller>
    </>
  );
};

export default ManageProduct;
