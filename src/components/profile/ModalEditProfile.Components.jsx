/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import moment from "moment";
import { useRouter } from "next/router";
import { forwardRef, useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserContext from "../../context/user.context";

const ModalEditProfile = ({ show }) => {
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

  // DatePicker
  const [startDate, setStartDate] = useState(null);
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className={`w-[50%] h-[2rem] border rounded-md p-1`}
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

  const router = useRouter();

  const userContext = useContext(UserContext);
  useEffect(() => {
    if (userContext.CompleteLoad === true) {
      if (userContext.UserToken !== "") {
        setStartDate(new Date(userContext.UserInfo.user_date_of_birth));
        setUserName(userContext.UserInfo.user_name);
        setUserGender(userContext.UserInfo.user_gender);
        setUserHp(parseInt(userContext.UserInfo.user_hp));
      }
    }

    // setStartDate(userContext.UserInfo);
  }, [userContext.CompleteLoad]);

  const setDate = (date) => {
    setStartDate(date);
    setUserDateOfBirth(moment(date).format("yyyy-MM-DD"));
  };

  return (
    <>
      {show ? (
        <>
          <div
            className={`flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center`}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className={`relative p-4 w-full max-w-xl h-full md:h-auto`}>
              <div
                className={`relative bg-white rounded-lg shadow dark:bg-gray-700 p-6`}
              >
                <div className={`pb-2`}>
                  <div className={`text-[16px]`}>Nama</div>
                  <input
                    type="text"
                    className={`w-[100%] h-[2rem] border rounded-md p-1`}
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
                    startDate={startDate}
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
                    className={`w-[100%] h-[2rem] border rounded-md p-1 webkit-appearance`}
                    onChange={(e) => {
                      setUserHp(e.target.value);
                      e.target.value !== ""
                        ? setCheckUserHp(true)
                        : setCheckUserHp(false);
                    }}
                    value={userHp}
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
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ModalEditProfile;
