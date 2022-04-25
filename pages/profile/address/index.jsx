import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import CardAddress from "../../../src/components/profile/CardAddress.Components";
import ProfileTab from "../../../src/components/profile/ProfileTab.Components";
import UserContext from "../../../src/context/user.context";

const AddressPage = () => {
  const [addNewAddressButton, setAddNewAddressButton] = useState(false);
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

  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.CompleteLoad == true) {
      if (userContext.UserToken !== "") {
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
  }, [searchProvinsi]);

  useEffect(() => {
    const _kabupatenData = kabupatenData;
    const search_text = searchKabupaten;
    const pattern_search = new RegExp(`${search_text.toLowerCase()}`);
    const result = _kabupatenData.filter((kab) => {
      if (pattern_search.test(kab.kabupaten_name.toLowerCase())) return true;
      return false;
    });

    setKabupatenDataCopy(result);
  }, [searchKabupaten]);

  useEffect(() => {
    const _kecamatanData = kecamatanData;
    const search_text = searchKecamatan;
    const pattern_search = new RegExp(`${search_text.toLowerCase()}`);
    const result = _kecamatanData.filter((kec) => {
      if (pattern_search.test(kec.kecamatan_name.toLowerCase())) return true;
      return false;
    });

    setKecamatanDataCopy(result);
  }, [searchKecamatan]);

  useEffect(() => {
    const _kelurahanData = kelurahanData;
    const search_text = searchKelurahan;
    const pattern_search = new RegExp(`${search_text.toLowerCase()}`);
    const result = _kelurahanData.filter((kel) => {
      if (pattern_search.test(kel.kelurahan_name.toLowerCase())) return true;
      return false;
    });

    setKecamatanDataCopy(result);
  }, [searchKelurahan]);

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
    setChooseProvinsi(false);
    setProvinsiView(provinsi.provinsi_name);
    setProvinsi(provinsi);
    KabupatenData(provinsi);
    if (kabupaten && kabupatenView) {
      setKabupaten([]);
      setKabupatenView("");
      setKecamatan([]);
      setKecamatanView("");
      setKelurahan([]);
      setKelurahanView("");
    }
  };

  const HandleChangeChooseKabupaten = (e) => {
    setSearchKabupaten(e.target.value);
    setKabupatenView(e.target.value);
    setChooseKabupaten(true);
  };

  const HandleChooseKabupaten = (kabupaten) => {
    setChooseKabupaten(false);
    setKabupatenView(kabupaten.kabupaten_name);
    setKabupaten(kabupaten);
    // KabupatenData(provinsi.provinsi_id);
    KecamatanData(kabupaten);
    if (kecamatan && kecamatanView) {
      setKecamatan([]);
      setKecamatanView("");
      setKelurahan([]);
      setKelurahanView("");
      KecamatanData(kabupaten);
    }
  };

  const HandleChangeChooseKecamatan = (e) => {
    setSearchKecamatan(e.target.value);
    setKecamatanView(e.target.value);
    setChooseKecamatan(true);
  };

  const HandleChooseKecamatan = (kecamatan) => {
    setChooseKecamatan(false);
    setKecamatan(kecamatan);
    setKecamatanView(kecamatan.kecamatan_name);
    KelurahanData(kecamatan);
    if (kelurahan && kelurahanView) {
      setKelurahan([]);
      setKelurahanView("");
      KelurahanData(kecamatan);
    }
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
    setAddNewAddressButton(false);
    setProvinsi([]);
    setProvinsiView("");
    setKabupaten([]);
    setKabupatenView("");
    setKecamatan([]);
    setKecamatanView("");
    setKelurahan([]);
    setKelurahanView("");
  };

  return (
    <>
      <ProfileTab>
        <div className={`m-2 w-full`}>
          <div className={`flex justify-end`}>
            <button
              type="button"
              className="block mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setAddNewAddressButton(true)}
            >
              Tambah Alamat baru
            </button>
          </div>

          {addNewAddressButton ? (
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
                      action="#"
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
                          value={userContext.UserInfo.user_name}
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
                                      onClick={() =>
                                        HandleChooseProvinsi(provinsi)
                                      }
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
                            <div className="mt-1 overflow-y-auto max-h-[40vh] fixed z-[100] w-[15rem] bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
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
                            <div className="mt-1 overflow-y-auto max-h-[20vh] fixed z-[100] w-[15rem] bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
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
                        {/* !provinsi &&
                        !kabupaten &&
                        !kecamatan */}
                        {!provinsi &&
                        !kabupaten &&
                        !kecamatan ? null : chooseKelurahan ? (
                          <>
                            <div className="mt-1 overflow-y-auto max-h-[20vh] fixed z-[100] w-[15rem] bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
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
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Daftarkan Alamat
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </>
          ) : null}

          <CardAddress></CardAddress>
        </div>
      </ProfileTab>
    </>
  );
};

export default AddressPage;
