import axios from "axios";
import { checkCookies } from "cookies-next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CardTransaction from "../../../src/components/seller/manage-transaction/CardTransaction.Components";
import TabSeller from "../../../src/components/seller/manage-transaction/TabSeller.Components";
import TabTransaction from "../../../src/components/seller/manage-transaction/TabTransaction.Components";
import UserContext from "../../../src/context/user.context";

const Complete = () => {
  const userContext = useContext(UserContext);
  const [completedTransactionData, setCompletedTransactionData] = useState([]);
  const [loadingTransaction, setLoadingTransaction] = useState({
    loading: false,
    isNull: false,
  });
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
          completedTransaction();
        } else {
          router.push("/seller/register-store");
        }
      }
    }
  }, [userContext.CompleteLoad]);

  const completedTransaction = async () => {
    setLoadingTransaction({ loading: false });
    try {
      const completedTransaction = (
        await axios.get(`api/sellerTransaction/completedTransactionByUserId`, {
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;

      if (completedTransaction.length !== 0) {
        setCompletedTransactionData(completedTransaction);
        setLoadingTransaction({ loading: true, isNUll: false });
      } else {
        setLoadingTransaction({ loading: true, isNUll: true });
      }
    } catch (error) {}
  };
  return (
    <>
      {loadingTransaction.loading == true ? (
        <>
          <TabSeller>
            <TabTransaction>
              {completedTransactionData.map((transaction) => (
                <React.Fragment key={transaction.transaction_id}>
                  <CardTransaction transaction={transaction} />
                </React.Fragment>
              ))}
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

export default Complete;
