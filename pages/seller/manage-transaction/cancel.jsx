import axios from "axios";
import { checkCookies } from "cookies-next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CardTransaction from "../../../src/components/seller/manage-transaction/CardTransaction.Components";
import TabSeller from "../../../src/components/seller/manage-transaction/TabSeller.Components";
import TabTransaction from "../../../src/components/seller/manage-transaction/TabTransaction.Components";
import UserContext from "../../../src/context/user.context";
import moment from "moment";

const Cancel = () => {
  const userContext = useContext(UserContext);
  const [cancelTransactionData, setCancelTransactionData] = useState([]);
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
          cancelTransaction();
        } else {
          router.push("/seller/register-store");
        }
      }
    }
  }, [userContext.CompleteLoad]);

  const cancelTransaction = async () => {
    setLoadingTransaction({ loading: false });
    try {
      const cancelTransaction = (
        await axios.get(`api/sellerTransaction/cancelTransactionByUserId`, {
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;

      if (cancelTransaction.length !== 0) {
        setCancelTransactionData(cancelTransaction);
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
              {cancelTransactionData.map((transaction) => (
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

export default Cancel;
