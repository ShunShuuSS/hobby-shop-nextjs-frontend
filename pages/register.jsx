import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [userDateOfBirth, setUserDateOfBirth] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userHp, setUserHp] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");
  const [showUserPassword, setShowUserPassword] = useState("password");
  const [showUserPasswordConfirm, setShowUserPasswordConfirm] =
    useState("password");

  const [checkUserName, setCheckUserName] = useState(true);
  const [checkUserDateOfBirth, setCheckUserDateOfBirth] = useState(true);
  const [checkUserGender, setCheckUserGender] = useState(true);
  const [checkUserHp, setCheckUserHp] = useState(true);
  const [checkUserPassword, setCheckUserPassword] = useState(true);
  const [checkUserPasswordNotNull, setCheckUserPasswordNotNull] =
    useState(true);
  const [checkUserPasswordComfirmNotNull, setCheckUserPasswordComfirmNotNull] =
    useState(true);
  const [checkUserEmail, setCheckUserEmail] = useState(false);
  const [checkUserEmailNotNull, setCheckUserEmailNotNull] = useState(true);
  const [checkUserEmailText, setCheckUserEmailText] = useState(true);

  const [verification, setVerification] = useState(false);
  //   if (
  //     checkUserEmail == true &&
  //     checkUserEmailNotNull == true &&
  //     checkUserName == true &&
  //     checkUserDateOfBirth == true &&
  //     checkUserGender == true &&
  //     checkUserHp == true &&
  //     checkUserPasswordNotNull == true &&
  //     checkUserPasswordComfirmNotNull == true &&
  //     checkUserPassword == true
  //   ) {
  //     console.log("berhasil");
  //     UserRegister();
  //   }

  const router = useRouter();

  const UserRegister = async () => {
    const userRegisterData = {
      user_name: userName,
      user_date_of_birth: userDateOfBirth,
      user_gender: userGender,
      user_email: userEmail,
      user_hp: userHp,
      user_password: userPassword,
    };

    try {
      const register = await axios.post("api/auth/register", userRegisterData);

      //   router.push("/logi")
    } catch (error) {}
  };

  const CheckUserEmail = async () => {
    try {
      console.log(userEmail);
      const _checkUserEmail = (
        await axios.get("api/auth/checkUserEmail", {
          params: {
            user_email: userEmail,
          },
        })
      ).data.data;

      if (!userEmail) {
        setCheckUserEmailNotNull(false);
        setCheckUserEmail(false);
      } else if (!_checkUserEmail.length) {
        setCheckUserEmailNotNull(true);
        setCheckUserEmail(true);
        setCheckUserEmailText(true);
      } else {
        setCheckUserEmail(false);
        setCheckUserEmailText(false);
      }
    } catch (error) {}
  };

  const ShowPassword = (e) => {
    if (e.target.checked == true) {
      setShowUserPassword("text");
    } else {
      setShowUserPassword("password");
    }
  };

  const form = (e) => {
    e.preventDefault();

    if (!userName) {
      setCheckUserName(false);
      setVerification(false);
    } else {
      setCheckUserName(true);
      setVerification(true);
    }

    if (!userDateOfBirth) {
      setCheckUserDateOfBirth(false);
      setVerification(false);
    } else {
      setCheckUserDateOfBirth(true);
      setVerification(true);
    }

    if (!userGender) {
      setCheckUserGender(false);
      setVerification(false);
    } else {
      setCheckUserGender(true);
      setVerification(true);
    }

    if (!userHp) {
      setCheckUserHp(false);
      setVerification(false);
    } else {
      setCheckUserHp(true);
      setVerification(true);
    }

    if (!userPassword) {
      setCheckUserPasswordNotNull(false);
      setVerification(false);
    } else {
      setCheckUserPasswordNotNull(true);
      setVerification(true);
    }

    if (!userPasswordConfirm) {
      setCheckUserPasswordComfirmNotNull(false);
      setVerification(false);
    } else {
      setCheckUserPasswordComfirmNotNull(true);
      setVerification(true);
    }

    if (
      checkUserPasswordNotNull == true &&
      checkUserPasswordComfirmNotNull == true
    ) {
      if (userPassword !== userPasswordConfirm) {
        setCheckUserPassword(false);
        setVerification(false);
      } else {
        setCheckUserPassword(true);
        setVerification(true);
      }
    }

    if (verification) {
      console.log("berhasil");
      UserRegister();
    }
  };
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className={`flex justify-center w-full`}>
        <div className={`block border rounded-md w-[25rem] py-5`}>
          <div className={`text-center text-[30px]`}>Daftar</div>

          <form onSubmit={form}>
            <div className={`flex justify-center w-[full]`}>
              <div className={`block w-[70%]`}>
                <div>
                  <div className={`text-[16px]`}>Email</div>
                  <input
                    type="text"
                    className={`w-[100%] h-[2rem] border rounded-md p-1`}
                    onChange={(e) => setUserEmail(e.target.value)}
                    disabled={checkUserEmail ? "disabled" : ""}
                  />
                  <div className={`${checkUserEmailText ? "hidden" : ""}`}>
                    <div className={`text-red-600`}>Email sudah terdaftar.</div>
                  </div>
                  <div className={`${checkUserEmailNotNull ? "hidden" : ""}`}>
                    <div className={`text-red-600`}>
                      Email tidak boleh kosong.
                    </div>
                  </div>
                  <div
                    className={`${
                      checkUserEmail ? "hidden" : ""
                    } w-full border rounded-md mt-5 cursor-pointer`}
                    onClick={() => CheckUserEmail()}
                  >
                    <div className={`text-[20px] font-bold p-1 text-center`}>
                      Selanjutnya
                    </div>
                  </div>
                </div>

                <div className={`${checkUserEmail ? "" : "hidden"}`}>
                  <div>
                    <div className={`text-[16px]`}>Nama</div>
                    <input
                      type="text"
                      className={`w-[100%] h-[2rem] border rounded-md p-1`}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <div className={`${checkUserName ? "hidden" : ""}`}>
                      <div className={`text-red-600`}>
                        Nama tidak boleh kosong.
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={`text-[16px]`}>Tanggal Lahir</div>
                    <input
                      type="text"
                      className={`w-[100%] h-[2rem] border rounded-md p-1`}
                      onChange={(e) => setUserDateOfBirth(e.target.value)}
                    />
                    <div className={`${checkUserDateOfBirth ? "hidden" : ""}`}>
                      <div className={`text-red-600`}>
                        Tanggal lahir tidak boleh kosong.
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={`text-[16px]`}>Jenis Kelamin</div>
                    <input
                      type="text"
                      className={`w-[100%] h-[2rem] border rounded-md p-1`}
                      onChange={(e) => setUserGender(e.target.value)}
                    />
                    <div className={`${checkUserGender ? "hidden" : ""}`}>
                      <div className={`text-red-600`}>
                        Jenis kelamin tidak boleh kosong.
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className={`text-[16px]`}>Nomor Handphone</div>
                    <input
                      type="number"
                      className={`w-[100%] h-[2rem] border rounded-md p-1 webkit-appearance`}
                      onChange={(e) => setUserHp(e.target.value)}
                    />
                    <div className={`${checkUserHp ? "hidden" : ""}`}>
                      <div className={`text-red-600`}>
                        Nomor Handphone tidak boleh kosong.
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={`text-[16px]`}>Password</div>
                    <input
                      type={`${showUserPassword}`}
                      className={`w-full h-[2rem] border rounded-md p-1`}
                      onChange={(e) => setUserPassword(e.target.value)}
                    />
                    <div
                      className={`${checkUserPasswordNotNull ? "hidden" : ""}`}
                    >
                      <div className={`text-red-600`}>
                        Password tidak boleh kosong.
                      </div>
                    </div>

                    <div className={`text-[16px]`}>Konfirmasi Password</div>
                    <input
                      type={`${showUserPassword}`}
                      className={`w-full h-[2rem] border rounded-md p-1`}
                      onChange={(e) => setUserPasswordConfirm(e.target.value)}
                    />
                    <div
                      className={`${
                        checkUserPasswordComfirmNotNull ? "hidden" : ""
                      }`}
                    >
                      <div className={`text-red-600`}>
                        Password tidak boleh kosong.
                      </div>
                    </div>
                    <div className={`${checkUserPassword ? "hidden" : ""}`}>
                      <div className={`text-red-600`}>Password tidak sama.</div>
                    </div>
                    <input
                      type="checkbox"
                      className={``}
                      onChange={ShowPassword}
                    />
                    <span>Tampilkan password</span>
                  </div>
                  <button
                    type="submit"
                    className={`w-full border rounded-md mt-5`}
                    disabled={checkUserEmail ? "" : "disabled"}
                  >
                    <div className={`text-[20px] font-bold p-2`}>
                      Daftar Sekarang
                    </div>
                  </button>
                </div>

                <div
                  className={`w-full border rounded-md mt-5 cursor-pointer`}
                  onClick={() => Router.push("/login")}
                >
                  <div className={`text-[20px] font-bold p-2 text-center`}>
                    Login
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
