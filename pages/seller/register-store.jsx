/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { checkCookies } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CustomNotification from "../../src/components/notification/CustomNotification.Components";
import CustomVerificationCode from "../../src/components/notification/CustomVerificationCode.Components";
import UserContext from "../../src/context/user.context";

const RegisterStore = () => {
  const userContext = useContext(UserContext);

  const [verificationStoreName, setVerificationStoreName] = useState(false);

  // Input Field
  const [storeName, setStoreName] = useState("");
  // const [provinsiId, setProvinsiId] = useState("");
  // const [kabupatenId, setKabupatenId] = useState("");
  // const [kecamatanId, setKecamatanId] = useState("");
  // const [kelurahanId, setKelurahanId] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Address Store Session
  const [provinsiData, setProvinsiData] = useState([]);
  const [kabupatenData, setKabupatenData] = useState([]);
  const [kecamatanData, setKecamatanData] = useState([]);
  const [kelurahanData, setKelurahanData] = useState([]);

  // Choosed Address Session
  const [choosedProvinsi, setChoosedProvinsi] = useState("");
  const [choosedKabupaten, setChoosedKabupaten] = useState("");
  const [choosedKecamatan, setChoosedKecamatan] = useState("");
  const [choosedKelurahan, setChoosedKelurahan] = useState("");

  // notif
  const [checkStoreName, setCheckStoreName] = useState(false);
  const [storeNameIsNull, setStoreNameIsNull] = useState(false);
  const [provinsiIsnull, setProvinsiIsnull] = useState(false);
  const [kabupatenIsNull, setkabupatenIsNull] = useState(false);
  const [kecamatanIsNull, setKecamatanIsNull] = useState(false);
  const [kelurahanIsNull, setKelurahanIsNull] = useState(false);
  const [addressDetailIsNull, setAddressDetailIsNull] = useState(false);
  const [postalCodeIsNull, setPostalCodeIsNull] = useState(false);
  const [notifRegister, setNotifRegister] = useState({
    success: false,
    error: false,
  });

  // Verification Code
  const [inputResult, setInputResult] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [notifVerificationNotSuccess, setNotifVerificationNotSuccess] =
    useState(false);
  const [notifOtpExpired, setNotifOtpExpired] = useState(false);
  const [modalVerification, setModalVerification] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (checkCookies("user_token") == false) {
      router.push("/login");
    } else {
      if (userContext.CompleteLoad == true) {
        if (userContext.UserToken !== "") {
          if (userContext.StoreInfo.length) {
            router.push("/seller/manage-product");
          } else {
            ProvinsiData();
          }
        }
      }
    }
  }, [userContext.CompleteLoad]);

  // useEffect For Choosing Address

  useEffect(() => {
    if (choosedProvinsi !== "") {
      setKecamatanData([]);
      setKelurahanData([]);
      KabupatenData();
    }
  }, [choosedProvinsi]);

  useEffect(() => {
    if (choosedKabupaten !== "") {
      setKelurahanData([]);
      KecamatanData();
    }
  }, [choosedKabupaten]);

  useEffect(() => {
    if (choosedKecamatan !== "") {
      KelurahanData();
    }
  }, [choosedKecamatan]);

  // useEffect Register Store
  useEffect(() => {
    if (verificationCode !== "") {
      setTimeout(() => {
        setNotifVerificationNotSuccess(false);
        setNotifOtpExpired(true);

        setVerificationCode("");
      }, 600000);
    }
  }, [verificationCode]);

  useEffect(() => {
    if (inputResult.length === 6) {
      verificationOtpCode();
    }
  }, [inputResult]);

  const registerNewStore = async () => {
    const registerNewStore = (
      await axios.post(
        "api/store/registerNewStore",
        {
          store_name: storeName,
          provinsi_id: choosedProvinsi,
          kabupaten_id: choosedKabupaten,
          kecamatan_id: choosedKecamatan,
          kelurahan_id: choosedKelurahan,
          store_address_detial: addressDetail,
          postal_code: postalCode,
        },
        {
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        }
      )
    ).data.data;

    if (registerNewStore.token !== "") {
      await userContext.SetToken(registerNewStore.token);
      setNotifRegister({ success: true });
    }
  };

  // Verification
  const RequestEmailVerification = async () => {
    setNotifOtpExpired(false);
    setNotifVerificationNotSuccess(false);
    setModalVerification(true);
    try {
      const emailVerification = await axios.post(
        "api/auth/request_email_verification",
        {
          email: userContext.UserInfo.user_email,
        }
      );

      if (emailVerification.data.status_code === 200) {
        setVerificationCode(emailVerification.data.data.verification_code);
      }
    } catch (error) {
      setNotifOtpExpired(false);
      setNotifVerificationNotSuccess(false);
      setModalVerification(false);
    }
  };

  const verificationOtpCode = () => {
    if (verificationCode !== "" && inputResult !== "") {
      if (verificationCode == inputResult) {
        setNotifVerificationNotSuccess(false);
        setModalVerification(false);
        setVerificationSuccess(true);
        registerNewStore();
      } else {
        setNotifVerificationNotSuccess(true);
        setVerificationSuccess(false);
      }
    }
  };

  const _checkStoreName = async () => {
    try {
      const checkStoreNameDB = (
        await axios.get("api/store/checkStoreName", {
          params: {
            store_name: storeName,
          },
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;

      if (checkStoreNameDB.length) {
        return true;
      } else {
        return false;
      }
    } catch (error) {}
  };

  // Provinsi
  const ProvinsiData = async () => {
    const provinsi = (
      await axios.get("api/address/provinsi", {
        headers: {
          Authorization: `Bearer ${userContext.UserToken}`,
        },
      })
    ).data.data;

    if (provinsi.length) {
      setProvinsiData(provinsi);
    }
  };

  // Kabupaten Data
  const KabupatenData = async () => {
    try {
      const kabupaten = (
        await axios.get("api/address/kabupaten", {
          params: {
            provinsi_id: choosedProvinsi,
          },
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;

      if (kabupaten.length) {
        setKabupatenData(kabupaten);
      }
    } catch (error) {}
  };

  // Kecamatan Data
  const KecamatanData = async () => {
    try {
      const kecamatan = (
        await axios.get("api/address/kecamatan", {
          params: {
            kabupaten_id: choosedKabupaten,
          },
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;

      if (kecamatan.length) {
        setKecamatanData(kecamatan);
      }
    } catch (error) {}
  };

  // Kelurahan Data
  const KelurahanData = async () => {
    try {
      const kelurahan = (
        await axios.get("api/address/kelurahan", {
          params: {
            kecamatan_id: choosedKecamatan,
          },
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;

      if (kelurahan.length) {
        setKelurahanData(kelurahan);
      }
    } catch (error) {}
  };

  // Handle Selected
  const handleSelectedProvinsi = (e) => {
    setChoosedProvinsi(e.target.value);
    setChoosedKabupaten("");
    setChoosedKecamatan("");
    setChoosedKelurahan("");
  };

  const handleSelectedKabupaten = (e) => {
    setChoosedKabupaten(e.target.value);
    setChoosedKecamatan("");
    setChoosedKelurahan("");
  };

  const handleSelectedKecamatan = (e) => {
    setChoosedKecamatan(e.target.value);
    setChoosedKelurahan("");
  };

  const handleSelectedKeluraahn = (e) => {
    setChoosedKelurahan(e.target.value);
  };

  // FORM

  const form = async (e) => {
    e.preventDefault();
    if (await handleValidation()) {
      RequestEmailVerification();
    }
  };

  const handleValidation = async () => {
    let formIsValid = true;

    if (storeName === "") {
      formIsValid = false;
      setCheckStoreName(false);
      setStoreNameIsNull(true);
    } else {
      setStoreNameIsNull(false);
      if (await _checkStoreName()) {
        setCheckStoreName(true);
        formIsValid = false;
      } else {
        setCheckStoreName(false);
      }
    }

    if (choosedProvinsi === "") {
      setProvinsiIsnull(true);
      formIsValid = false;
    } else {
      setProvinsiIsnull(false);
    }

    if (choosedKabupaten === "") {
      setkabupatenIsNull(true);
      formIsValid = false;
    } else {
      setkabupatenIsNull(false);
    }

    if (choosedKecamatan === "") {
      setKecamatanIsNull(true);
      formIsValid = false;
    } else {
      setKecamatanIsNull(false);
    }

    if (choosedKelurahan === "") {
      setKelurahanIsNull(true);
      formIsValid = false;
    } else {
      setKelurahanIsNull(false);
    }

    //     addressDetail
    // postalCode

    if (addressDetail === "") {
      setAddressDetailIsNull(true);
      formIsValid = false;
    } else {
      setAddressDetailIsNull(false);
    }

    if (postalCode === "") {
      setPostalCodeIsNull(true);
      formIsValid = false;
    } else {
      setPostalCodeIsNull(false);
    }
    return formIsValid;
  };

  return (
    <>
      <Head>
        <title>Register Store</title>
      </Head>

      <CustomNotification
        show={notifRegister.success}
        text={"Pendaftaran Toko selesai"}
        goToRouteText={"ke halaman utama seller"}
        goToRoute={"/seller/manage-product"}
      />

      <CustomVerificationCode
        show={modalVerification}
        toEmail={userContext.UserInfo.user_email}
        setInputResult={setInputResult}
        NotifNotSuccess={notifVerificationNotSuccess}
        notifOtpExpired={notifOtpExpired}
        RequestEmailVerification={RequestEmailVerification}
      />

      <div className={``}>
        <div className={`flex justify-center w-[full]`}>
          <div className={`block w-[25rem]`}>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={form}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nama Toko
                        </label>
                        <input
                          type="text"
                          name="street-address"
                          id="street-address"
                          autoComplete="street-address"
                          className="h-[2rem] border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={(e) => setStoreName(e.target.value)}
                        />
                        {storeNameIsNull ? (
                          <>
                            <div className={`text-red-600`}>
                              Nama Toko tidak boleh kosong.
                            </div>
                          </>
                        ) : null}

                        {checkStoreName ? (
                          <>
                            <div className={`text-red-600`}>
                              Nama Toko sudah digunakan. Cari nama lain.
                            </div>
                          </>
                        ) : null}
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Provinsi
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          defaultValue={"pilih_provinsi"}
                          onChange={(e) => handleSelectedProvinsi(e)}
                        >
                          <option disabled={true} value={"pilih_provinsi"}>
                            Pilih Provinsi
                          </option>
                          {provinsiData.length ? (
                            <>
                              {provinsiData.map((provinsi, i) => (
                                <React.Fragment key={i}>
                                  <option value={provinsi.provinsi_id}>
                                    {provinsi.provinsi_name}
                                  </option>
                                </React.Fragment>
                              ))}
                            </>
                          ) : null}
                        </select>
                        {provinsiIsnull ? (
                          <>
                            <div className={`text-red-600`}>
                              Provinsi tidak boleh kosong.
                            </div>
                          </>
                        ) : null}
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Kabupaten
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          defaultValue={"pilih_kabupaten"}
                          onChange={(e) => handleSelectedKabupaten(e)}
                        >
                          <option disabled={true} value={"pilih_kabupaten"}>
                            Pilih Kabupaten
                          </option>
                          {kabupatenData.length ? (
                            <>
                              {kabupatenData.map((kabupaten, i) => (
                                <React.Fragment key={kabupaten.kabupaten_id}>
                                  <option value={kabupaten.kabupaten_id}>
                                    {kabupaten.kabupaten_name}
                                  </option>
                                </React.Fragment>
                              ))}
                            </>
                          ) : null}
                        </select>
                        {kabupatenIsNull ? (
                          <>
                            <div className={`text-red-600`}>
                              Kabupaten tidak boleh kosong.
                            </div>
                          </>
                        ) : null}
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Kecamatan
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          defaultValue={"pilih_kecamatan"}
                          onChange={(e) => handleSelectedKecamatan(e)}
                        >
                          <option disabled={true} value={"pilih_kecamatan"}>
                            Pilih Kecamatan
                          </option>
                          {kecamatanData.length ? (
                            <>
                              {kecamatanData.map((kecamatan, i) => (
                                <React.Fragment key={kecamatan.kecamatan_id}>
                                  <option value={kecamatan.kecamatan_id}>
                                    {kecamatan.kecamatan_name}
                                  </option>
                                </React.Fragment>
                              ))}
                            </>
                          ) : null}
                        </select>
                        {kecamatanIsNull ? (
                          <>
                            <div className={`text-red-600`}>
                              Kecamatan tidak boleh kosong.
                            </div>
                          </>
                        ) : null}
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Kelurahan
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          defaultValue={"pilih_kelurahan"}
                          onChange={(e) => handleSelectedKeluraahn(e)}
                        >
                          <option disabled={true} value={"pilih_kelurahan"}>
                            Pilih Kelurahan
                          </option>
                          {kelurahanData.length ? (
                            <>
                              {kelurahanData.map((kelurahan) => (
                                <React.Fragment key={kelurahan.kelurahan_id}>
                                  <option value={kelurahan.kelurahan_id}>
                                    {kelurahan.kelurahan_name}
                                  </option>
                                </React.Fragment>
                              ))}
                            </>
                          ) : null}
                        </select>
                        {kelurahanIsNull ? (
                          <>
                            <div className={`text-red-600`}>
                              Kelurahan tidak boleh kosong.
                            </div>
                          </>
                        ) : null}
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Detail Alamat
                        </label>
                        <textarea
                          name="street-address"
                          id="street-address"
                          cols=""
                          rows="4"
                          className="border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={(e) => setAddressDetail(e.target.value)}
                        />
                        {addressDetailIsNull ? (
                          <>
                            <div className={`text-red-600`}>
                              Detail Alamat tidak boleh kosong.
                            </div>
                          </>
                        ) : null}
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Kode Pos
                        </label>
                        <input
                          type="number"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="h-[2rem] border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={(e) => setPostalCode(e.target.value)}
                        />
                        {postalCodeIsNull ? (
                          <>
                            <div className={`text-red-600 absolute`}>
                              Kode pos tidak boleh kosong.
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
                    >
                      Daftar Toko Sekarang
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* <button type="submit" className={`w-full border rounded-md mt-5`}>
                <div className={`text-[20px] font-bold p-2`}>
                  Daftar Toko Sekarang
                </div>
              </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterStore;
