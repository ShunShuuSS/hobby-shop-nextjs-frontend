/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { checkCookies } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CardAddress from "../../../src/components/profile/CardAddress.Components";
import FormAddNewAddress from "../../../src/components/profile/FormAddNewAddress.Components";
import ProfileTab from "../../../src/components/profile/ProfileTab.Components";
import UserContext from "../../../src/context/user.context";

const AddressPage = () => {
  const [modalAddNewAddress, setModalAddNewAddress] = useState(false);
  const [addressData, setAddressData] = useState([]);

  // Helper state
  const [loadDataComplete, setLoadDataComplete] = useState(false);
  const [newDataComing, setNewDataComing] = useState(false);

  const userContext = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (checkCookies("user_token") == false) {
      router.push("/login");
    } else {
      if (userContext.CompleteLoad == true) {
        if (userContext.UserToken !== "") {
          AllUserAddress();
        }
      }
    }
  }, [userContext.CompleteLoad]);

  useEffect(() => {
    if (userContext.CompleteLoad == true) {
      if (userContext.UserToken !== "") {
        if (newDataComing) {
          AllUserAddress();
        }
      }
    }
  }, [userContext.CompleteLoad && newDataComing]);

  const AllUserAddress = async () => {
    const rows = (
      await axios.get(`api/address/userAddress`, {
        headers: {
          Authorization: `Bearer ${userContext.UserToken}`,
        },
      })
    ).data.data;

    if (rows.length) {
      setNewDataComing(false);
      setAddressData(rows);
    }
    setLoadDataComplete(true);
  };

  return (
    <>
      <ProfileTab>
        <div className={`m-2 w-full`}>
          <div className={`flex justify-end`}>
            <button
              type="button"
              className="block mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setModalAddNewAddress(true)}
            >
              Tambah Alamat baru
            </button>
          </div>

          {modalAddNewAddress ? (
            <>
              <FormAddNewAddress
                setModalAddNewAddress={setModalAddNewAddress}
                setNewDataComing={setNewDataComing}
              />
            </>
          ) : null}

          {loadDataComplete ? (
            <>
              {addressData.length ? (
                <>
                  {addressData.map((address) => (
                    <React.Fragment key={address.user_address_id}>
                      <CardAddress address={address} />
                    </React.Fragment>
                  ))}
                </>
              ) : null}
            </>
          ) : (
            <>
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
            </>
          )}
        </div>
      </ProfileTab>
    </>
  );
};

export default AddressPage;
