import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import UserContext from "../../src/context/user.context";

const Change = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [passwordNull, setPasswordNull] = useState(false);
  const [passwordConfirmNull, setPasswordConfirmNull] = useState(false);
  const [confirmationDone, setConfirmationDone] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordWrong, setOldPasswordWrong] = useState("");
  const [confirmOldPassword, setconfirmOldPassword] = useState(false);
  const [confirmOldPasswordNull, setconfirmOldPasswordNull] = useState(false);

  const userContext = useContext(UserContext);

  const router = useRouter();

  // useEffect(() => {}, []);

  const ConfirmUserOldPassword = async () => {
    try {
    } catch (error) {}
  };

  const ResetUserPassword = async () => {
    try {
      const resetUserPassword = await axios.post(
        `api/auth/resetUserPassword`,
        {
          user_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        }
      );

      if (resetUserPassword) {
      }
    } catch (error) {}
  };

  const HandleVerifyUserPassword = () => [];

  const HandleConfirmationButton = () => {
    if (!newPassword) {
      setPasswordNull(true);
      setConfirmationDone(false);
    } else {
      setPasswordNull(false);
      setConfirmationDone(true);
    }
  };

  const form = (e) => {
    e.preventDefault();
    if (!newPasswordConfirm) {
      setPasswordConfirmNull(true);
    } else {
      setPasswordConfirmNull(false);
      if (newPassword === newPasswordConfirm) {
        ResetUserPassword();
        router.push("/profile");
      }
    }
  };
  return (
    <>
      <div className={`w-full flex justify-center`}>
        <form onSubmit={form}>
          <div className={`flex w-full`}>
            <div className={`w-[25rem] block border rounded-xl p-[1rem_5rem]`}>
              {/* <div>
                <div className={`${confirmationDone ? "hidden" : ""}`}>
                  <div className={`text-center`}>Verifikasi Password Lama</div>

                  <input
                    type="password"
                    className={`w-full border rounded-md p-2 mt-5`}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />

                  <div
                    className={`${
                      confirmOldPasswordNull ? "" : "hidden"
                    } text-red-600`}
                  >
                    Password tidak boleh kosong.
                  </div>

                  <div
                    className={`${
                      oldPasswordWrong ? "" : "hidden"
                    } text-red-600`}
                  >
                    Password yang dimasukkan salah.
                  </div>

                  <button
                    type="button"
                    className={`w-full border mt-5 p-2`}
                    onClick={() => HandleVerifyUserPassword()}
                  >
                    Lanjut
                  </button>
                </div>
              </div> */}
              {/* <div className={`${confirmOldPassword ? "" : "hidden"}`}> */}
              <div className={`${confirmationDone ? "hidden" : ""}`}>
                <div className={`text-center`}>Password Baru</div>

                <input
                  type="password"
                  className={`w-full border rounded-md p-2 mt-5`}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <div className={`${passwordNull ? "" : "hidden"} text-red-600`}>
                  Password tidak boleh kosong.
                </div>

                <button
                  type="button"
                  className={`w-full border mt-5 p-2`}
                  onClick={() => HandleConfirmationButton()}
                >
                  Konfirmasi
                </button>
              </div>

              <div className={`${confirmationDone ? "" : "hidden"}`}>
                <div className={`text-center`}>Konfimasi Password</div>

                <input
                  type="password"
                  className={`w-full border rounded-md p-2 mt-5`}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                />

                <div
                  className={`${
                    passwordConfirmNull ? "" : "hidden"
                  } text-red-600`}
                >
                  Password tidak boleh kosong.
                </div>

                <button type="submit" className={`w-full border mt-5 p-2`}>
                  Ubah Password
                </button>
              </div>
              {/* </div> */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Change;
