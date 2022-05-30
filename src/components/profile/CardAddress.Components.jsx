import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user.context";
import FormEditAddress from "./FormEditAddress.Components";

const CardAddress = ({ address }) => {
  const [modalEditForm, setModalEditForm] = useState(false);
  const [deleteAddress, setDeleteAddress] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [UserUseAddress, setUserUseAddress] = useState([]);
  const userContext = useContext(UserContext);

  useEffect(() => {
    setUserUseAddress(userContext.UserInfo.user_id_address);
  }, [userContext.UserInfo]);

  const changeUserUseAddress = async () => {
    try {
      const updateUserUseAddress = (
        await axios.post(
          `api/address/updateUserUseAddress`,
          {
            user_id_address: address.user_address_id,
          },
          {
            headers: {
              Authorization: `Bearer ${userContext.UserToken}`,
            },
          }
        )
      ).data.data;

      if (updateUserUseAddress.affectedRows) {
        userContext.setUpdateUserAddress(true);
        setUserUseAddress(address.user_address_id);
      }
    } catch (error) {}
  };

  const deleteUserAddress = async () => {
    setLoadingDelete(true);
    try {
      const deleteUserAddress = (
        await axios.post(
          `api/address/deleteUserAddress`,
          {
            user_address_id: address.user_address_id,
          },
          {
            headers: {
              Authorization: `Bearer ${userContext.UserToken}`,
            },
          }
        )
      ).data.data;

      if (deleteUserAddress.affectedRows) {
        setDeleteAddress(true);
      }
    } catch (error) {}
  };

  return (
    <>
      {!deleteAddress ? (
        <>
          <div
            className={`w-full p-2 flex justify-between border rounded-md mb-5`}
          >
            <div className={`block`}>
              <div className={`font-bold text-[17px]`}>
                {address.receiver_name} <span>({address.phone_number})</span>
              </div>
              <div className={`text-[14px]`}>
                {address.user_address_detail}, {address.kelurahan_name},{" "}
                {address.kecamatan_name}, {address.kabupaten_name},{" "}
                {address.provinsi_name}.
              </div>
              <div className={`text-[14px]`}>{address.postal_code}</div>
              <div className={`flex`}>
                <div className={`flex justify-start mr-2`}>
                  <button
                    type="button"
                    className={`flex justify-center w-[9rem] h-[2.2rem] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                    onClick={() => deleteUserAddress()}
                  >
                    {loadingDelete ? (
                      <>
                        <svg
                          role="status"
                          className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                      "Hapus Alamat"
                    )}
                  </button>
                </div>
                <div className={`flex justify-start`}>
                  <button
                    type="button"
                    className={`block w-[9rem] h-[2.2rem] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                    onClick={() => setModalEditForm(true)}
                  >
                    Ubah Alamat
                  </button>
                </div>
                {modalEditForm ? (
                  <>
                    <FormEditAddress
                      address={address}
                      setModalEditForm={setModalEditForm}
                    />
                  </>
                ) : null}
              </div>
            </div>
            <div className={`block my-auto`}>
              <div className={`flex`}>
                {UserUseAddress === address.user_address_id ? (
                  <>Alamat telah digunakan</>
                ) : (
                  <>
                    <button
                      type="button"
                      className={`block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                      onClick={() => changeUserUseAddress()}
                    >
                      Pakai alamat ini
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default CardAddress;
