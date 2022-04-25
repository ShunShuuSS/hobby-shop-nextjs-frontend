import axios from "axios";
import { checkCookies } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../src/context/user.context";

const RegisterStore = () => {
  const userContext = useContext(UserContext);
  const [checkStoreName, setCheckStoreName] = useState(true);
  const [registerStoreName, setRegisterStoreName] = useState("");
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
          router.push("/seller");
        }
      }
    }
  }, [userContext.CompleteLoad]);

  const _checkStoreName = async () => {
    console.log("masuk ke checkstorename");
    try {
      const checkStoreNameDB = (
        await axios.get("api/store/checkStoreName", {
          params: {
            store_name: registerStoreName,
          },
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;
      if (checkStoreNameDB.length) {
        setCheckStoreName(false);
      } else {
        setCheckStoreName(true);
      }
    } catch (error) {}
  };

  const registerNewStore = async () => {
    const registerNewStore = await axios.post(
      "api/store/registerNewStore",
      {
        store_name: registerStoreName,
      },
      {
        headers: {
          Authorization: `Bearer ${userContext.UserToken}`,
        },
      }
    );

    if (registerNewStore) {
      //   router.push("/seller");
      router.reload("/seller");
    }
  };

  const form = (e) => {
    e.preventDefault();
    _checkStoreName();
    if (checkStoreName) {
      registerNewStore();
    }
  };

  return (
    <>
      <Head>
        <title>Register Store</title>
      </Head>
      <div className={``}>
        <form onSubmit={form}>
          <div className={`flex justify-center w-[full]`}>
            <div className={`block w-[30%]`}>
              <div className={`text-[18px]`}>Nama Toko</div>
              <input
                type="text"
                className={`w-[100%] h-[2rem] border rounded-md p-1`}
                onChange={(e) => setRegisterStoreName(e.target.value)}
              />
              <div className={`${checkStoreName ? "hidden" : ""} text-red-600`}>
                Nama Toko sudah digunakan. Cari nama lain.
              </div>
              <button type="submit" className={`w-full border rounded-md mt-5`}>
                <div className={`text-[20px] font-bold p-2`}>
                  Daftar Toko Sekarang
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterStore;
