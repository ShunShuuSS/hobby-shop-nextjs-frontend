/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CardProduct from "../../src/components/product/CardProduct.Components";

const SearchPage = () => {
  const [searchQuery, setsearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchDataComplete, setSearchDataComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.sv) {
      setsearchQuery(router.query.sv);
      _searchData({ searchQuery: router.query.sv });
    }
  }, [router.query.sv]);

  const _searchData = async ({ searchQuery }) => {
    setSearchDataComplete(false);
    const searchDataValue = (
      await axios.get(`api/search/product`, {
        params: {
          search_query: searchQuery,
        },
      })
    ).data.data;

    if (searchDataValue) {
      setSearchData(searchDataValue);
    }

    setSearchDataComplete(true);
  };

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
                  {searchData.map((searchProduct, i) => (
                    <div key={i}>
                      <CardProduct
                        product_id={searchProduct.product_id}
                        store_id={searchProduct.store_id}
                        product_img={searchProduct.product_img}
                        product_name={searchProduct.product_name}
                        product_price={searchProduct.product_price}
                        product_rating={searchProduct.product_rating}
                      />
                    </div>
                  ))}
                </>
              ) : null}
            </>
          ) : (
            <>
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-[15rem] bg-slate-200 rounded"></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
