/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import axios from "axios";
import IsEmail from "isemail";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import parsePhoneNumber from "libphonenumber-js";
import PasswordValidator from "password-validator";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomNotification from "../src/components/notification/CustomNotification.Components";
import CustomVerificationCode from "../src/components/notification/CustomVerificationCode.Components";
import UserContext from "../src/context/user.context";
import capitalize from "capitalize";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [userDateOfBirth, setUserDateOfBirth] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userHp, setUserHp] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");
  const [showUserPassword, setShowUserPassword] = useState("password");
  const [passwordValidationMessage, setPasswordValidationMessage] = useState(
    []
  );

  const [checkUserName, setCheckUserName] = useState(true);
  const [checkUserDateOfBirth, setCheckUserDateOfBirth] = useState(true);
  const [checkUserGender, setCheckUserGender] = useState(true);
  const [checkUserHp, setCheckUserHp] = useState(true);
  const [phonenumberRegistered, setPhonenumberRegistered] = useState(false);
  const [phonenumberValidation, setPhonenumberValidation] = useState(true);
  const [checkUserPassword, setCheckUserPassword] = useState(true);
  const [checkUserPasswordNotNull, setCheckUserPasswordNotNull] =
    useState(true);
  const [checkUserPasswordComfirmNotNull, setCheckUserPasswordComfirmNotNull] =
    useState(true);
  const [checkUserEmail, setCheckUserEmail] = useState(false);
  const [checkUserEmailNotNull, setCheckUserEmailNotNull] = useState(true);
  const [checkUserEmailText, setCheckUserEmailText] = useState(true);
  const [emailRegistered, setEmailRegistered] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [emailCanBeUsed, setEmailCanBeUsed] = useState(false);

  // Verification Code
  const [inputResult, setInputResult] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [notifVerificationNotSuccess, setNotifVerificationNotSuccess] =
    useState(false);
  const [notifOtpExpired, setNotifOtpExpired] = useState(false);
  const [modalVerification, setModalVerification] = useState(false);

  // Helper
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [notifRegister, setNotifRegister] = useState({
    success: false,
    error: false,
  });

  // DatePicker
  const [startDate, setStartDate] = useState(null);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className={`w-[50%] h-[2rem] border border-black bg-white rounded-md p-1`}
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

  // Password Validator
  var schemaPassword = new PasswordValidator();

  schemaPassword
    .is()
    .min(8, "Password minimal 8 karakter") // Minimum length 8
    .is()
    .max(100, "Password maksimal 100 karakter") // Maximum length 100
    .has()
    .uppercase(1, "Password minimal memiliki 1 karakter huruf besar") // Must have uppercase letters
    .has()
    .lowercase(1, "Password minimal memiliki 1 karakter huruf kecil") // Must have lowercase letters
    .has()
    .digits(2, "Password minimal memiliki 2 angka") // Must have at least 2 digits
    .has()
    .not()
    .spaces(0, "Password tidak boleh mengandung spasi") // Should not have spaces
    .is()
    .not()
    .oneOf(["password", "Password", "Passw0rd", "Password123"]); // Blacklist these values

  const router = useRouter();

  const userContext = useContext(UserContext);

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

  const UserRegister = async () => {
    setLoadingRegister(true);
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
      if (register.data.data.token !== "") {
        await userContext.SetToken(register.data.data.token);
        setNotifRegister({ success: true });
      }
    } catch (error) {
      console.log("terjadi kesalahan");
    }
  };

  const emailValidation = async () => {
    let emailIsValid = true;
    if (userEmail !== "") {
      setCheckUserEmailNotNull(true);
      if (IsEmail.validate(userEmail)) {
        setEmailValid(true);
        if (!(await CheckUserEmail()).length) {
          setEmailRegistered(false);
          setEmailCanBeUsed(true);
        } else {
          emailIsValid = false;
          setEmailRegistered(true);
          setEmailCanBeUsed(false);
        }
      } else {
        emailIsValid = false;
        setEmailValid(false);
      }
    } else {
      emailIsValid = false;
      setCheckUserEmailNotNull(false);
    }

    return emailIsValid;
  };

  const CheckUserEmail = async () => {
    try {
      const _checkUserEmail = (
        await axios.get("api/auth/checkUserEmail", {
          params: {
            user_email: userEmail,
          },
        })
      ).data.data;

      return _checkUserEmail;
    } catch (error) {
      setModalVerification(false);
      handleValidation();
    }
  };

  const RequestEmailVerification = async () => {
    setNotifOtpExpired(false);
    setNotifVerificationNotSuccess(false);
    setModalVerification(true);
    try {
      const emailVerification = await axios.post(
        "api/auth/request_email_verification",
        {
          email: userEmail,
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
        UserRegister();
      } else {
        setNotifVerificationNotSuccess(true);
        setVerificationSuccess(false);
      }
    }
  };

  // Check User Phonenumber
  const CheckUserHp = async (phonenumber) => {
    try {
      const _checkUserHp = (
        await axios.get("api/auth/checkUserPhonenumber", {
          params: {
            user_hp: phonenumber,
          },
        })
      ).data.data;

      if (_checkUserHp.length) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      handleValidation();
      console.log("Terjadi kesalahan pada bagian pengecekan nomor telepon");
    }
  };

  const ShowPassword = (e) => {
    if (e.target.checked == true) {
      setShowUserPassword("text");
    } else {
      setShowUserPassword("password");
    }
  };

  const setDate = (date) => {
    setStartDate(date);
    setUserDateOfBirth(moment(date).format("yyyy-MM-DD"));
  };

  const form = async (e) => {
    e.preventDefault();

    if ((await handleValidation()) === true) {
      RequestEmailVerification();
    }
  };

  const handleValidation = async () => {
    let formIsValid = true;

    if (!(await emailValidation())) {
      formIsValid = false;
    }

    if (userName === "") {
      setCheckUserName(false);
      formIsValid = false;
    } else {
      setUserName(capitalize.words(userName));
      setCheckUserName(true);
    }

    if (userDateOfBirth === "") {
      setCheckUserDateOfBirth(false);
      formIsValid = false;
    } else {
      setCheckUserDateOfBirth(true);
    }

    if (userGender === "") {
      setCheckUserGender(false);
      formIsValid = false;
    } else {
      setCheckUserGender(true);
    }

    if (userHp === "") {
      setCheckUserHp(false);
      setPhonenumberValidation(true);
      formIsValid = false;
    } else {
      const phoneNumber = parsePhoneNumber(userHp, "ID");
      if (phoneNumber.isValid() === true) {
        setPhonenumberValidation(true);
        if (await CheckUserHp(phoneNumber.number)) {
          formIsValid = false;
          setPhonenumberRegistered(true);
        } else {
          setUserHp(phoneNumber.number);
          setPhonenumberRegistered(false);
        }
      } else {
        setPhonenumberValidation(false);
        setPhonenumberRegistered(false);
        formIsValid = false;
      }
    }

    if (userPassword === "") {
      setCheckUserPasswordNotNull(false);
      formIsValid = false;
    } else {
      setCheckUserPasswordNotNull(true);
      if (!schemaPassword.validate(userPassword)) {
        formIsValid = false;
        setPasswordValidationMessage(
          schemaPassword.validate(userPassword, { details: true })
        );
      } else {
        setPasswordValidationMessage([]);
      }
    }

    if (userPasswordConfirm === "") {
      setCheckUserPasswordComfirmNotNull(false);
      formIsValid = false;
    } else {
      setCheckUserPasswordComfirmNotNull(true);
    }

    if (userPassword !== "" && userPasswordConfirm !== "") {
      if (userPassword === userPasswordConfirm) {
        setCheckUserPassword(true);
      } else {
        setCheckUserPassword(false);
        formIsValid = false;
      }
    }
    return formIsValid;
  };
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <CustomNotification
        show={notifRegister.success}
        text={"Pendaftaran akun selesai"}
        goToRouteText={"ke halaman utama Hobby Shop"}
        goToRoute={"/"}
      />
      <CustomVerificationCode
        show={modalVerification}
        toEmail={userEmail}
        setInputResult={setInputResult}
        NotifNotSuccess={notifVerificationNotSuccess}
        notifOtpExpired={notifOtpExpired}
        RequestEmailVerification={RequestEmailVerification}
      />
      <div className={`flex justify-center w-full`}>
        <div className={`block border border-black rounded-md w-[30rem] py-5`}>
          <div className={`text-center text-[30px]`}>Daftar</div>

          {/* <form onSubmit={form}> */}
          <div className={`flex justify-center w-[full]`}>
            <div className={`block w-[80%]`}>
              <div>
                <div className={`text-[16px]`}>Email</div>
                <input
                  type="text"
                  id="email"
                  className={`w-[100%] h-[2rem] border border-black rounded-md p-1`}
                  onChange={(e) => setUserEmail(e.target.value)}
                  disabled={emailCanBeUsed ? true : false}
                />
                {emailCanBeUsed ? (
                  <>
                    <button
                      className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border rounded-md p-2 mt-1`}
                      onClick={() => setEmailCanBeUsed(false)}
                    >
                      Ubah email
                    </button>
                  </>
                ) : null}

                {emailRegistered ? (
                  <>
                    <label htmlFor="email" className={`text-red-600`}>
                      Email sudah terdaftar.
                    </label>
                  </>
                ) : null}

                {!checkUserEmailNotNull ? (
                  <>
                    <label htmlFor="email" className={`text-red-600`}>
                      Email tidak boleh kosong.
                    </label>
                  </>
                ) : null}

                {!emailValid ? (
                  <>
                    <label htmlFor="email" className={`text-red-600`}>
                      Email tidak valid.
                    </label>
                  </>
                ) : null}

                {!emailCanBeUsed ? (
                  <>
                    <button
                      type="button"
                      className={`w-full border border-black rounded-md mt-5 cursor-pointer text-[20px] font-bold p-1 text-center`}
                      onClick={() => emailValidation()}
                    >
                      Selanjutnya
                    </button>
                  </>
                ) : null}
              </div>

              {emailCanBeUsed ? (
                <>
                  <div className={`pb-2`}>
                    <div className={`text-[16px]`}>Nama</div>
                    <input
                      type="text"
                      className={`w-[100%] h-[2rem] border border-black rounded-md p-1`}
                      onChange={(e) => {
                        setUserName(e.target.value);
                        e.target.value !== ""
                          ? setCheckUserName(true)
                          : setCheckUserName(false);
                      }}
                      value={userName}
                    />
                    <div className={`${checkUserName ? "hidden" : ""}`}>
                      <div className={`text-red-600`}>
                        Nama tidak boleh kosong.
                      </div>
                    </div>
                  </div>
                  <div className={` pb-2`}>
                    <div className={`text-[16px]`}>Tanggal Lahir</div>
                    <ReactDatePicker
                      selected={startDate}
                      onChange={(date) => {
                        setDate(date);
                        date !== ""
                          ? setCheckUserDateOfBirth(true)
                          : setCheckUserDateOfBirth(false);
                      }}
                      showYearDropdown
                      dateFormat="dd-MMMM-yyyy"
                      yearDropdownItemNumber={100}
                      scrollableYearDropdown
                      disabledKeyboardNavigation
                      placeholderText="Pilih tanggal lahir"
                      customInput={<ExampleCustomInput />}
                    />
                    <div className={`${checkUserDateOfBirth ? "hidden" : ""}`}>
                      <div className={`text-red-600`}>
                        Tanggal lahir tidak boleh kosong.
                      </div>
                    </div>
                  </div>
                  <div className={`block pb-2`}>
                    <div className={`text-[16px]`}>Jenis Kelamin</div>
                    <div>
                      <input
                        type="radio"
                        className={``}
                        id="html"
                        value="Male"
                        name="gender"
                        onClick={(e) => {
                          setUserGender(e.target.value);
                          setCheckUserGender(true);
                        }}
                      />
                      <label htmlFor="html" className={`pl-3`}>
                        Laki-laki
                      </label>
                    </div>

                    <div className={``}>
                      <input
                        type="radio"
                        className={``}
                        id="css"
                        name="gender"
                        value="Female"
                        onClick={(e) => {
                          setUserGender(e.target.value);
                          setCheckUserGender(true);
                        }}
                      />
                      <label htmlFor="css" className={`pl-3`}>
                        Perempuan
                      </label>
                    </div>

                    <div className={`${checkUserGender ? "hidden" : ""}`}>
                      <div className={`text-red-600`}>Pilih jenis kelamin.</div>
                    </div>
                  </div>

                  <div className={`pb-2`}>
                    <div className={`text-[16px]`}>Nomor Handphone</div>
                    <input
                      type="number"
                      className={`w-[100%] h-[2rem] border border-black rounded-md p-1 webkit-appearance`}
                      onChange={(e) => {
                        setUserHp(e.target.value);
                        e.target.value !== ""
                          ? setCheckUserHp(true)
                          : setCheckUserHp(false);
                      }}
                    />
                    {!checkUserHp ? (
                      <>
                        <div className={`text-red-600`}>
                          Nomor HP tidak boleh kosong.
                        </div>
                      </>
                    ) : null}

                    {phonenumberRegistered ? (
                      <>
                        <div className={`text-red-600`}>
                          Nomor HP sudah terdaftar.
                        </div>
                      </>
                    ) : null}

                    {!phonenumberValidation ? (
                      <>
                        <div className={`text-red-600`}>
                          Nomor HP tidak valid.
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div className={``}>
                    <div className={`text-[16px]`}>Password</div>
                    <input
                      type={`${showUserPassword}`}
                      className={`w-full h-[2rem] border border-black rounded-md p-1`}
                      onChange={(e) => {
                        setUserPassword(e.target.value);
                        e.target.value !== ""
                          ? setCheckUserPasswordNotNull(true)
                          : setCheckUserPasswordNotNull(false);
                      }}
                    />
                    {!checkUserPasswordNotNull ? (
                      <>
                        <div className={`text-red-600`}>
                          Password tidak boleh kosong.
                        </div>
                      </>
                    ) : null}

                    {passwordValidationMessage.length ? (
                      <>
                        {passwordValidationMessage.map((validation, index) => (
                          <React.Fragment key={index}>
                            <div className={`text-red-600`}>
                              {validation.message}
                            </div>
                          </React.Fragment>
                        ))}
                      </>
                    ) : null}

                    {/* passwordValidationMessage */}

                    <div className={`text-[16px]`}>Konfirmasi Password</div>
                    <input
                      type={`${showUserPassword}`}
                      className={`w-full h-[2rem] border border-black rounded-md p-1`}
                      onChange={(e) => {
                        setUserPasswordConfirm(e.target.value);
                        e.target.value !== ""
                          ? setCheckUserPasswordComfirmNotNull(true)
                          : setCheckUserPasswordComfirmNotNull(false);
                      }}
                    />
                    <div
                      className={`${
                        checkUserPasswordComfirmNotNull ? "hidden" : ""
                      }`}
                    >
                      <div className={`text-red-600`}>
                        Konfirmasi password tidak boleh kosong.
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
                  {!emailRegistered ? (
                    <>
                      <button
                        type="submit"
                        className={`w-full border rounded-md mt-5`}
                        onClick={(e) => form(e)}
                      >
                        <div
                          className={`text-[20px] font-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                        >
                          Daftar Sekarang
                        </div>
                      </button>
                    </>
                  ) : null}
                </>
              ) : null}

              <div
                className={`w-full border rounded-md mt-5 cursor-pointer`}
                onClick={() => router.push("/login")}
              >
                <div
                  className={`text-[20px] font-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                >
                  Login
                </div>
              </div>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
