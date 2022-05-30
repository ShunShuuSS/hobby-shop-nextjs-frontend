import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user.context";

const FormEditAddress = ({ address, setModalEditForm, setNewDataComing }) => {
  const [provinsi, setProvinsi] = useState([]);
  const [provinsiView, setProvinsiView] = useState("");
  const [chooseProvinsi, setChooseProvinsi] = useState(false);
  const [searchProvinsi, setSearchProvinsi] = useState("");
  const [provinsiData, setProvinsiData] = useState([]);
  const [provinsiDataCopy, setProvinsiDataCopy] = useState([]);

  const [kabupaten, setKabupaten] = useState([]);
  const [kabupatenView, setKabupatenView] = useState("");
  const [chooseKabupaten, setChooseKabupaten] = useState(false);
  const [searchKabupaten, setSearchKabupaten] = useState("");
  const [kabupatenData, setKabupatenData] = useState([]);
  const [kabupatenDataCopy, setKabupatenDataCopy] = useState([]);

  const [kecamatan, setKecamatan] = useState([]);
  const [kecamatanView, setKecamatanView] = useState("");
  const [chooseKecamatan, setChooseKecamatan] = useState(false);
  const [searchKecamatan, setSearchKecamatan] = useState("");
  const [kecamatanData, setKecamatanData] = useState([]);
  const [kecamatanDataCopy, setKecamatanDataCopy] = useState([]);

  const [kelurahan, setKelurahan] = useState([]);
  const [kelurahanView, setKelurahanView] = useState("");
  const [chooseKelurahan, setChooseKelurahan] = useState(false);
  const [searchKelurahan, setSearchKelurahan] = useState("");
  const [kelurahanData, setKelurahanData] = useState([]);
  const [kelurahanDataCopy, setKelurahanDataCopy] = useState([]);

  const [receiverName, setReceiverName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  // Helper State
  const [loadingButton, setLoadingButton] = useState(false);

  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.CompleteLoad == true) {
      if (userContext.UserToken !== "") {
        setReceiverName(address.receiver_name);
        setProvinsi({ address });
        setProvinsiView(address.provinsi_name);
        ProvinsiData();
      }
    }
  }, [userContext.CompleteLoad]);

  useEffect(() => {
    const _provinsiData = provinsiData;
    const search_text = searchProvinsi;
    const pattern_search = new RegExp(`${search_text.toLowerCase()}`);
    const result = _provinsiData.filter((p) => {
      if (pattern_search.test(p.provinsi_name.toLowerCase())) return true;
      return false;
    });

    setProvinsiDataCopy(result);
  }, [searchProvinsi.length]);

  useEffect(() => {
    const _kabupatenData = kabupatenData;
    const search_text = searchKabupaten;
    const pattern_search = new RegExp(`${search_text.toLowerCase()}`);
    const result = _kabupatenData.filter((kab) => {
      if (pattern_search.test(kab.kabupaten_name.toLowerCase())) return true;
      return false;
    });

    setKabupatenDataCopy(result);
  }, [searchKabupaten.length]);

  useEffect(() => {
    const _kecamatanData = kecamatanData;
    const search_text = searchKecamatan;
    const pattern_search = new RegExp(`${search_text.toLowerCase()}`);
    const result = _kecamatanData.filter((kec) => {
      if (pattern_search.test(kec.kecamatan_name.toLowerCase())) return true;
      return false;
    });

    setKecamatanDataCopy(result);
  }, [searchKecamatan.length]);

  useEffect(() => {
    const _kelurahanData = kelurahanData;
    const search_text = searchKelurahan;
    const pattern_search = new RegExp(`${search_text.toLowerCase()}`);
    const result = _kelurahanData.filter((kel) => {
      if (pattern_search.test(kel.kelurahan_name.toLowerCase())) return true;
      return false;
    });

    setKelurahanDataCopy(result);
  }, [searchKelurahan.length]);

  const CreateNewAddress = async () => {
    setLoadingButton(true);

    const resultInsert = (
      await axios.post(
        "api/address/addNewAddress",
        {
          receiver_name: receiverName,
          provinsi_id: provinsi.provinsi_id,
          kabupaten_id: kabupaten.kabupaten_id,
          kecamatan_id: kecamatan.kecamatan_id,
          kelurahan_id: kelurahan.kelurahan_id,
          phone_number: phoneNumber,
          postal_code: postalCode,
          user_address_detail: detailAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        }
      )
    ).data.data;

    if (resultInsert.affectedRows) {
      setNewDataComing(true);
      HandleCloseModal();
    }
  };

  const ProvinsiData = async () => {
    const provinsiData = (
      await axios.get("api/address/provinsi", {
        headers: {
          Authorization: `Bearer ${userContext.UserToken}`,
        },
      })
    ).data.data;

    if (provinsiData.length) {
      setProvinsiData(provinsiData);
    }
  };

  const KabupatenData = async (provinsi) => {
    try {
      const kabupatenData = (
        await axios.get("api/address/kabupaten", {
          params: {
            provinsi_id: provinsi.provinsi_id,
          },
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;

      if (kabupatenData.length) {
        setKabupatenData(kabupatenData);
      }
    } catch (error) {}
  };

  const KecamatanData = async (kabupaten) => {
    try {
      const kecamatanData = (
        await axios.get("api/address/kecamatan", {
          params: {
            kabupaten_id: kabupaten.kabupaten_id,
          },
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;
      if (kecamatanData.length) {
        setKecamatanData(kecamatanData);
      }
    } catch (error) {}
  };

  const KelurahanData = async (kecamatan) => {
    try {
      const kelurahanData = (
        await axios.get("api/address/kelurahan", {
          params: {
            kecamatan_id: kecamatan.kecamatan_id,
          },
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;

      if (kelurahanData.length) {
        setKelurahanData(kelurahanData);
      }
    } catch (error) {}
  };

  const HandleChangeChooseProvinsi = (e) => {
    setSearchProvinsi(e.target.value);
    setProvinsiView(e.target.value);
    setChooseProvinsi(true);
  };

  const HandleChooseProvinsi = (provinsi) => {
    if (kabupaten && kabupatenView) {
      setKabupaten([]);
      setKabupatenView("");
      setKecamatan([]);
      setKecamatanView("");
      setKelurahan([]);
      setKelurahanView("");
    }
    setChooseProvinsi(false);
    setProvinsiView(provinsi.provinsi_name);
    setProvinsi(provinsi);
    KabupatenData(provinsi);
  };

  const HandleChangeChooseKabupaten = (e) => {
    setSearchKabupaten(e.target.value);
    setKabupatenView(e.target.value);
    setChooseKabupaten(true);
  };

  const HandleChooseKabupaten = (kabupaten) => {
    if (kecamatan && kecamatanView) {
      setKecamatan([]);
      setKecamatanView("");
      setKelurahan([]);
      setKelurahanView("");
      KecamatanData(kabupaten);
    }
    setChooseKabupaten(false);
    setKabupatenView(kabupaten.kabupaten_name);
    setKabupaten(kabupaten);
    // KabupatenData(provinsi.provinsi_id);
    KecamatanData(kabupaten);
  };

  const HandleChangeChooseKecamatan = (e) => {
    setSearchKecamatan(e.target.value);
    setKecamatanView(e.target.value);
    setChooseKecamatan(true);
  };

  const HandleChooseKecamatan = (kecamatan) => {
    if (kelurahan && kelurahanView) {
      setKelurahan([]);
      setKelurahanView("");
      KelurahanData(kecamatan);
    }
    setChooseKecamatan(false);
    setKecamatan(kecamatan);
    setKecamatanView(kecamatan.kecamatan_name);
    KelurahanData(kecamatan);
  };

  const HandleChangeChooseKeluarahan = (e) => {
    setSearchKelurahan(e.target.value);
    setKelurahanView(e.target.value);
    setChooseKelurahan(true);
  };

  const HandleChooseKelurahan = (kelurahan) => {
    setChooseKelurahan(false);
    setKelurahanView(kelurahan.kelurahan_name);
    setKelurahan(kelurahan);
  };

  const removeAllModal = () => {
    if (chooseProvinsi) {
      setChooseProvinsi(false);
    }

    if (chooseKabupaten) {
      setChooseKabupaten(false);
    }

    if (chooseKecamatan) {
      setChooseKecamatan(false);
    }

    if (chooseKelurahan) {
      setChooseKelurahan(false);
    }
  };

  const HandleCloseModal = () => {
    setModalEditForm(false);
  };

  const HandleFormSubmit = (e) => {
    e.preventDefault();
    if (HandleValidationInput()) {
      CreateNewAddress();
    }
  };

  const HandleValidationInput = () => {
    let formIsValid = true;

    if (provinsi.length === 0) {
      formIsValid = false;
    }

    if (kabupaten.length === 0) {
      formIsValid = false;
    }

    if (kecamatan.length === 0) {
      formIsValid = false;
    }

    if (kelurahan.length === 0) {
      formIsValid = false;
    }

    if (receiverName === "") {
      formIsValid = false;
    }

    if (postalCode === "") {
      formIsValid = false;
    }

    if (phoneNumber === "") {
      formIsValid = false;
    }

    if (detailAddress === "") {
      formIsValid = false;
    }

    return formIsValid;
  };
  return (
    <>
      <div
        className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
        style={{ backgroundColor: "rgba(128, 128, 128, 0.5)" }}
        onClick={() => removeAllModal()}
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => HandleCloseModal()}
              >
                <svg className="w-5 h-5">
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                </svg>
              </button>
            </div>
            <form
              className="overflow-y-auto max-h-[70vh] px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
              onSubmit={HandleFormSubmit}
            >
              {/* Nama */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Nama Penerima
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Keterangan alamat..."
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                />
              </div>
              {/* Provinsi */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Provinsi
                </label>
                {/* search provinsi */}
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="cari disini..."
                  onChange={HandleChangeChooseProvinsi}
                  onClick={() =>
                    chooseProvinsi
                      ? setChooseProvinsi(false)
                      : setChooseProvinsi(true)
                  }
                  value={provinsiView || ""}
                />

                {/* Dropdown Provinsi */}
                {chooseProvinsi ? (
                  <>
                    <div className="mt-1 relative overflow-y-auto max-h-[40vh] z-[100] w-[15rem] bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                        {(provinsiDataCopy.length
                          ? provinsiDataCopy
                          : provinsiData
                        ).map((provinsi) => (
                          <li key={provinsi.provinsi_id}>
                            <a
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              onClick={() => HandleChooseProvinsi(provinsi)}
                            >
                              {provinsi.provinsi_name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : null}
              </div>
              {/* Kabupaten */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Kabupaten
                </label>
                {/* search kabupaten */}
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="cari disini..."
                  onChange={HandleChangeChooseKabupaten}
                  onClick={() =>
                    chooseKabupaten
                      ? setChooseKabupaten(false)
                      : setChooseKabupaten(true)
                  }
                  value={kabupatenView}
                />

                {!provinsi ? null : chooseKabupaten ? (
                  <>
                    <div className="mt-1 overflow-y-auto max-h-[40vh] z-[100] w-[15rem] bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                        {!provinsi
                          ? null
                          : (kabupatenDataCopy.length
                              ? kabupatenDataCopy
                              : kabupatenData
                            ).map((kabupaten) => (
                              <li key={kabupaten.kabupaten_id}>
                                <a
                                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() =>
                                    HandleChooseKabupaten(kabupaten)
                                  }
                                >
                                  {kabupaten.kabupaten_name}
                                </a>
                              </li>
                            ))}
                      </ul>
                    </div>
                  </>
                ) : null}
              </div>
              {/* Kecamatan */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Kecamatan
                </label>
                {/* search kecamatan */}
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="cari disini..."
                  onChange={HandleChangeChooseKecamatan}
                  onClick={() =>
                    chooseKecamatan
                      ? setChooseKecamatan(false)
                      : setChooseKecamatan(true)
                  }
                  value={kecamatanView}
                />

                {!provinsi && !kabupaten ? null : chooseKecamatan ? (
                  <>
                    <div className="mt-1 overflow-y-auto max-h-[40vh] z-[100] w-[15rem] bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                        {!provinsi && !kabupaten
                          ? null
                          : (kecamatanDataCopy.length
                              ? kecamatanDataCopy
                              : kecamatanData
                            ).map((kecamatan) => (
                              <li key={kecamatan.kecamatan_id}>
                                <a
                                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() =>
                                    HandleChooseKecamatan(kecamatan)
                                  }
                                >
                                  {kecamatan.kecamatan_name}
                                </a>
                              </li>
                            ))}
                      </ul>
                    </div>
                  </>
                ) : null}
              </div>

              {/* Kelurahan */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Keluarahan
                </label>
                {/* search keluarahan */}
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="cari disini..."
                  onChange={HandleChangeChooseKeluarahan}
                  onClick={() =>
                    chooseKelurahan
                      ? setChooseKelurahan(false)
                      : setChooseKelurahan(true)
                  }
                  value={kelurahanView}
                />

                {!provinsi &&
                !kabupaten &&
                !kecamatan ? null : chooseKelurahan ? (
                  <>
                    <div className="mt-1 overflow-y-auto max-h-[40vh] z-[100] w-[15rem] bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                        {!provinsi && !kabupaten && !kecamatan
                          ? null
                          : (kelurahanDataCopy.length
                              ? kelurahanDataCopy
                              : kelurahanData
                            ).map((kelurahan) => (
                              <li key={kelurahan.kelurahan_id}>
                                <a
                                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() =>
                                    HandleChooseKelurahan(kelurahan)
                                  }
                                >
                                  {kelurahan.kelurahan_name}
                                </a>
                              </li>
                            ))}
                      </ul>
                    </div>
                  </>
                ) : null}
              </div>

              {/* Keterangan alamat */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Keterangan Alamat
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Keterangan alamat..."
                  onChange={(e) => setDetailAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Nomor Telp
                </label>
                <input
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="081234567890"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Kode Pos
                </label>
                <input
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder={`12345`}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {loadingButton ? (
                  <>
                    <svg
                      role="status"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </>
                ) : (
                  "Daftarkan Alamat"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormEditAddress;
