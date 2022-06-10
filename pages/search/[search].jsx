/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CardProduct from "../../src/components/product/CardProduct.Components";

const SearchQuryPage = () => {
  const [searchQuery, setsearchQuery] = useState("");
  const [topProductData, setTopProductData] = useState([]);
  const [topProductLoadComplete, setTopProductLoadComplete] = useState(true);

  const [searchData, setSearchData] = useState([]);
  const [searchDataComplete, setSearchDataComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    _searchData({ searchQuery: router.query.search });
  }, [router.query.search]);

  const _searchData = async ({ searchQuery }) => {
    console.log(searchQuery);
    const searchDataValue = await axios.get(`api/product`, {
      params: {
        search_query: searchQuery,
      },
    });
  };

  //   console.log(router.query.search);
  return (
    <>
      <div className={``}>
        <div
          className={`grid gap-4 mobile-s:grid-cols-2 mobile-xl:grid-cols-3 tablet:grid-cols-4 laptop:grid-cols-6`}
        >
          {searchDataComplete ? (
            <>
              {searchData.length ? (
                <>
                  {searchData.map((topProductList) => (
                    <div key={topProductList.product_id}>
                      <CardProduct
                        product_id={topProductList.product_id}
                        store_id={topProductList.store_id}
                        product_img={topProductList.product_img}
                        product_name={topProductList.product_name}
                        product_price={topProductList.product_price}
                        product_rating={topProductList.product_rating}
                      />
                    </div>
                  ))}
                </>
              ) : null}
            </>
          ) : (
            <>
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <React.Fragment key={index}>
                  <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-[15rem] bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchQuryPage;
