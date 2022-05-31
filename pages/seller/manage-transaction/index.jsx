import axios from "axios";
import { checkCookies } from "cookies-next";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import CardTransaction from "../../../src/components/seller/manage-transaction/CardTransaction.Components";
import TabSeller from "../../../src/components/seller/manage-transaction/TabSeller.Components";
import TabTransaction from "../../../src/components/seller/manage-transaction/TabTransaction.Components";
import UserContext from "../../../src/context/user.context";

const SellerTransaction = () => {
  const [transactionData, setTransactionData] = useState([]);
  const userContext = useContext(UserContext);
  const [loadingTransaction, setLoadingTransaction] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (checkCookies("user_token") == false) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (userContext.CompleteLoad == true) {
      if (userContext.UserToken !== "") {
        if (userContext.StoreInfo.length !== 0) {
          GetSellerTransaction();
        } else {
          router.push("/seller/register-store");
        }
      }
    }
  }, [userContext.CompleteLoad]);

  const GetSellerTransaction = async () => {
    setLoadingTransaction(false);
    try {
      const sellerTransaction = (
        await axios.get(`api/sellerTransaction/allTransactionByUserId`, {
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;

      if (sellerTransaction.length !== 0) {
        setTransactionData(sellerTransaction);
        setLoadingTransaction(true);
      } else {
        setLoadingTransaction(true);
      }
    } catch (error) {}
  };
  return (
    <>
      {loadingTransaction == true ? (
        <>
          <TabSeller>
            <TabTransaction>
              {transactionData.length ? (
                <>
                  {transactionData.map((transaction) => (
                    <React.Fragment key={transaction.transaction_id}>
                      <CardTransaction transaction={transaction} />
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <>
                  <div
                    className={`h-full font-bold text-[20px] flex justify-center top-1/2`}
                  >
                    Tidak ada pesanan
                  </div>
                </>
              )}
            </TabTransaction>
          </TabSeller>
        </>
      ) : (
        <>
          <TabSeller>
            <TabTransaction>
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
            </TabTransaction>
          </TabSeller>
        </>
      )}
    </>
  );
};

export default SellerTransaction;
