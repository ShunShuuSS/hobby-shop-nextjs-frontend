/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import ProductCard from "../../../src/components/seller/manage-product/ProductCard.Components";
import TabSeller from "../../../src/components/seller/manage-transaction/TabSeller.Components";
import UserContext from "../../../src/context/user.context";
import helper from "../../../src/helper";
import ReactPaginate from "react-paginate";
import { checkCookies } from "cookies-next";
import { useRouter } from "next/router";

const ManageProduct = () => {
  const [productData, setProductData] = useState([]);

  const [pageError, setPageError] = useState(false);
  const userContext = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (checkCookies("user_token") == false) {
      router.push("/login");
    } else {
      if (userContext.CompleteLoad == true) {
        if (userContext.UserToken !== "") {
          if (userContext.StoreInfo.length === 0) {
            router.push("/seller/register-store");
          }
          productDataPerPage();
        }
      }
    }
  }, [userContext.CompleteLoad || (userContext.CompleteLoad && currentPage)]);

  const getProductData = async () => {
    const getProduct = (
      await axios.get("api/sellerProduct/allProductByStoreId", {
        params: {
          store_id: userContext.StoreInfo.store_id,
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

  // Product per Page
  const [countPage, setCountPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (userContext.CompleteLoad == true) {
      if (userContext.UserToken !== "") {
        productDataPerPage();
      }
    }
  }, [currentPage]);

  const productDataPerPage = async () => {
    try {
      const totalProduct = (
        await axios.get(`api/sellerProduct/totalProductByStoreId`, {
          params: {
            store_id: userContext.StoreInfo.store_id,
          },
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;

      if (totalProduct.length) {
        setCountPage(Math.ceil(parseInt(totalProduct[0].total_product) / 10));
      }

      const data = (
        await axios.get(`api/sellerProduct/productByStoreIdPerPage`, {
          params: {
            store_id: userContext.StoreInfo.store_id,
            page: currentPage,
          },
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;

      if (data.length) {
        setProductData(data);
      }
    } catch (error) {}
  };

  const handlePageChange = (e) => {
    setCurrentPage(e.selected + 1);
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
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            pageCount={countPage}
            previousLabel="< previous"
            pageLinkClassName="bg-white border-gray-300 hover:bg-indigo-400 inline-flex items-center px-4 py-2 outline-style-1 text-sm font-medium"
            previousLinkClassName="relative inline-flex items-center px-2 py-2 rounded-l-md outline-style-1 border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            nextLinkClassName="relative inline-flex items-center px-2 py-2 rounded-r-md outline-style-1 border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            breakLabel="..."
            breakClassName="bg-white border-gray-300 text-black hover:bg-gray-50 relative inline-flex items-center px-4 py-2 outline-style-1 text-sm font-medium"
            breakLinkClassName=""
            containerClassName="bg-white px-4 py-3 flex items-center justify-end border-t border-gray-200 sm:px-6"
            activeLinkClassName="bg-indigo-200 border-indigo-500 text-black"
            renderOnZeroPageCount={null}
          />
        </div>
      </TabSeller>
    </>
  );
};

export default ManageProduct;
