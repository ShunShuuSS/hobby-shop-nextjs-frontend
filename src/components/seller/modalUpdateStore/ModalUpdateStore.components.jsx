/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { checkCookies } from "cookies-next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/user.context";

const ModalUpdateStore = ({ setOpenModal, storeInfo }) => {
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
  const [addressDetail, setAddressDetail] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // notif
  const [provinsiIsnull, setProvinsiIsnull] = useState(false);
  const [kabupatenIsNull, setkabupatenIsNull] = useState(false);
  const [kecamatanIsNull, setKecamatanIsNull] = useState(false);
  const [kelurahanIsNull, setKelurahanIsNull] = useState(false);
  const [addressDetailIsNull, setAddressDetailIsNull] = useState(false);
  const [postalCodeIsNull, setPostalCodeIsNull] = useState(false);

  const userContext = useContext(UserContext);
  const router = useRouter();

  // useEffect For Choosing Address
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
            setChoosedProvinsi(storeInfo.provinsi_id);
            setChoosedKabupaten(storeInfo.kabupaten_id);
            setChoosedKecamatan(storeInfo.kecamatan_id);
            setChoosedKelurahan(storeInfo.kelurahan_id);
            setAddressDetail(storeInfo.store_address_detail);
            setPostalCode(storeInfo.postal_code);
          }
        }
      }
    }
  }, [userContext.CompleteLoad]);

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
            provinsi_id:
              choosedProvinsi !== "" ? choosedProvinsi : storeInfo.provinsi_id,
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
            kabupaten_id:
              choosedKabupaten !== ""
                ? choosedKabupaten
                : storeInfo.kabupaten_id,
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
            kecamatan_id:
              choosedKecamatan !== ""
                ? choosedKecamatan
                : storeInfo.kecamatan_id,
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

  // Update Address

  const updateAddressStore = async () => {
    try {
      const update = await axios.post(
        "api/setting/updateAddress",
        {
          store_id: storeInfo.store_id,
          provinsi_id: choosedProvinsi,
          kabupaten_id: choosedKabupaten,
          kecamatan_id: choosedKecamatan,
          keluharan_id: choosedKelurahan,
          store_address_detail: addressDetail,
          postal_code: postalCode,
        },
        {
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        }
      );

      if (update.data.data.data.affectedRows) {
        await userContext.SetToken(update.data.data.token);
        setOpenModal(false);
      }
    } catch (error) {
      console.log("error");
    }
  };

  // FORM

  const form = async (e) => {
    e.preventDefault();
    if (await handleValidation()) {
      updateAddressStore();
    }
  };

  const handleValidation = async () => {
    let formIsValid = true;

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
      <div
        className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
        style={{ backgroundColor: "rgba(128, 128, 128, 0.5)" }}
        // onClick={() => setOpenModal(false)}
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => setOpenModal(false)}
              >
                <svg className="w-5 h-5">
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                </svg>
              </button>
            </div>
            <form
              className="overflow-y-auto max-h-[70vh] px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
              onSubmit={form}
            >
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
                  value={choosedProvinsi}
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
                  value={choosedKabupaten}
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
                  value={choosedKecamatan}
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
                  value={choosedKelurahan}
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
                  value={addressDetail}
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
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
                {postalCodeIsNull ? (
                  <>
                    <div className={`text-red-600`}>
                      Kode pos tidak boleh kosong.
                    </div>
                  </>
                ) : null}
              </div>
              <div className="py-3 text-right">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
                >
                  Ubah Alamat
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalUpdateStore;
