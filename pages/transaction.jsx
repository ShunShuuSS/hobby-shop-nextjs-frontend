import axios from "axios";
import { checkCookies } from "cookies-next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CardProductTransaction from "../src/components/transaction/CardProductTransaction.Components";
import UserContext from "../src/context/user.context";

const TransactionPage = () => {
  const [transactionData, setTransactionData] = useState([]);

  const userContext = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (checkCookies("user_token") == false) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (userContext.CompleteLoad == true) {
      if (userContext.UserToken === "") {
        router.push(`/login`);
      }
      getUserAllTransaction();
    }
  }, [userContext.CompleteLoad]);

  const getUserAllTransaction = async () => {
    const userAllTransaction = (
      await axios.get("api/transaction/getAllTransactionByUserId", {
        headers: {
          Authorization: `Bearer ${userContext.UserToken}`,
        },
      })
    ).data.data;
    if (userAllTransaction.length !== 0) {
      setTransactionData(userAllTransaction);
      console.log(userAllTransaction);
    }
  };

  return (
    <>
      <div className={`w-auto`}>
        {transactionData.map((transaction) => (
          <React.Fragment key={transaction.transaction_id}>
            <CardProductTransaction transaction={transaction} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default TransactionPage;
