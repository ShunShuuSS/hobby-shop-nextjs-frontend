/* eslint-disable @next/next/no-img-element */
import { checkCookies } from "cookies-next";
import Link from "next/link";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import TabSeller from "../../../src/components/seller/manage-transaction/TabSeller.Components";
import UserContext from "../../../src/context/user.context";
import { useRouter } from "next/router";
import axios from "axios";
import config from "../../../constants/config";
import ModalUpdateStore from "../../../src/components/seller/modalUpdateStore/ModalUpdateStore.Components";

const SettingStore = () => {
  const [storeNameView, setStoreNameView] = useState("");
  const [storeAddressView, setStoreAddressView] = useState("");
  const [storeImage, setStoreImage] = useState("");
  const [storeData, setStoreData] = useState([]);

  // Modal
  const [openModal, setOpenModal] = useState(false);

  const userContext = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (checkCookies("user_token") == false) {
      router.push("/login");
    } else {
      if (userContext.CompleteLoad == true) {
        if (userContext.UserToken !== "") {
          if (userContext.StoreInfo.length === 0) {
            router.push("/seller/register-store");
          } else {
            loadStoreImage();
            setStoreData(userContext.StoreInfo);
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.CompleteLoad]);

  const uploadStorePhoto = async (e) => {
    let formData = new FormData();

    if (e.target && e.target.files[0]) {
      formData.append("store_img", e.target.files[0]);
    }

    formData.append("store_id", userContext.StoreInfo.store_id);
    formData.append("old_store_img", userContext.StoreInfo.store_photo);

    try {
      const uploadNewProfilePhoto = (
        await axios.post(`api/setting/updateStoreImage`, formData, {
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;

      if (uploadNewProfilePhoto.affectedRows) {
        setStoreImage(URL.createObjectURL(e.target.files[0]));
      }
    } catch (error) {}
  };

  const handleUploadImage = (e) => {
    uploadStorePhoto(e);
  };

  const loadStoreImage = async () => {
    if (userContext.StoreInfo.store_photo !== null) {
      setStoreImage(
        config.imageApi + userContext.StoreInfo.store_photo + `_150` + `.webp`
      );
    } else {
      setStoreImage("/assets/seller/store.png");
    }
  };

  const DetailComponents = ({ children, index }) => {
    return (
      <div className={`flex w-full`}>
        <div className={`w-[8rem]`}>
          {index}
          <span className={`float-right`}>:&nbsp;</span>
        </div>
        <div className={`w-full`}>{children}</div>
      </div>
    );
  };

  return (
    <>
      <TabSeller>
        <div className={`mobile-s:block laptop:flex w-auto h-full`}>
          <div className={`flex justify-center`}>
            <div className={`w-[13rem] h-[13rem] laptop:mr-5`}>
              <div
                className={`relative group outline-style-1 rounded-md bg-white`}
              >
                {storeImage !== "" ? (
                  <>
                    <img
                      src={storeImage}
                      className={`object-cover w-full rounded-md group-hover:opacity-30 hover:transition`}
                      alt=""
                    />

                    <div
                      className={`absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2
              opacity-0 group-hover:opacity-100`}
                    >
                      <label
                        htmlFor="input-file"
                        className={`group-hover:cursor-pointer`}
                      >
                        <img
                          id={`edit-icon`}
                          className={`h-[5rem]`}
                          src="/assets/profile/editing.png"
                          alt=""
                        />
                      </label>

                      <input
                        type="file"
                        id={`input-file`}
                        className={``}
                        onChange={handleUploadImage}
                        accept={`image/*`}
                        hidden
                      />
                    </div>
                  </>
                ) : (
                  <svg
                    role="status"
                    className="w-[20%] h-[20%] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 absolute top-[40%] left-[40%]"
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
                )}
              </div>
            </div>
          </div>

          <div className={`flex`}>
            <div className={`w-auto h-auto block relative`}>
              <DetailComponents index={`Nama Toko`}>
                {storeData.store_name}
              </DetailComponents>
              <DetailComponents index={`Alamat`}>
                {storeData.store_address_detail +
                  ", " +
                  storeData.kelurahan_name +
                  ", " +
                  storeData.kecamatan_name +
                  ", " +
                  storeData.kabupaten_name +
                  ", " +
                  storeData.provinsi_name +
                  ", " +
                  storeData.postal_code}
              </DetailComponents>
              <div className={`w-full h-auto mobile-s:block laptop:flex`}>
                <div className="mobile-s:flex mobile-s:justify-center mobile-s:w-full mobile-s:mt-3 tablet:mt-0">
                  <div
                    className={`flex mobile-s:w-full tablet:w-auto tablet:right-0 laptop:bottom-0 absolute`}
                  >
                    <button
                      type="button"
                      className={`h-[3rem] mobile-s:w-full tablet:w-[12rem] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                      onClick={() => setOpenModal(true)}
                    >
                      Ubah Alamat Toko
                    </button>
                  </div>
                </div>
              </div>

              {openModal ? (
                <>
                  <ModalUpdateStore
                    setOpenModal={setOpenModal}
                    storeInfo={userContext.StoreInfo}
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </TabSeller>
    </>
  );
};

export default SettingStore;
