/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { checkCookies } from "cookies-next";
import { useRouter } from "next/router";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import parsePhoneNumber from "libphonenumber-js";
import UserContext from "../../context/user.context";
import moment from "moment";
import capitalize from "capitalize";

const FormEditProfile = ({ setModal, userInfo }) => {
  const [userName, setUserName] = useState("");
  const [userDateOfBirth, setUserDateOfBirth] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userHp, setUserHp] = useState("");

  const [checkUserName, setCheckUserName] = useState(true);
  const [checkUserDateOfBirth, setCheckUserDateOfBirth] = useState(true);
  const [checkUserGender, setCheckUserGender] = useState(true);
  const [checkUserHp, setCheckUserHp] = useState(true);
  const [phonenumberRegistered, setPhonenumberRegistered] = useState(false);
  const [phonenumberValidation, setPhonenumberValidation] = useState(true);

  const userContext = useContext(UserContext);
  const router = useRouter();

  // useEffect For Choosing Address
  useEffect(() => {
    if (checkCookies("user_token") == false) {
      router.push("/login");
    } else {
      if (userContext.CompleteLoad == true) {
        if (userContext.UserToken !== "") {
          setUserName(userInfo.user_name);

          setUserDateOfBirth(
            moment(userInfo.user_date_of_birth)
              .tz("Asia/Jakarta")
              .format("yyyy-MM-DD")
          );
          setStartDate(
            moment(userInfo.user_date_of_birth).tz("Asia/Jakarta").toDate()
          );
          setUserGender(userInfo.user_gender);
          setUserHp(parseInt(userInfo.user_hp));
        }
      }
    }
  }, [userContext.CompleteLoad]);

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

  // Update User Profile

  const updateProfile = async () => {
    try {
      const update = await axios.post(
        "api/user/editUserProfile",
        {
          user_name: userName,
          user_date_of_birth: userDateOfBirth,
          user_gender: userGender,
          user_hp: userHp,
        },
        {
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        }
      );

      if (update.data.data.affectedRows) {
        await userContext.setUpdateUserAddress(true);
        setModal(false);
      }
    } catch (error) {
      const err = error;
      const response = err.response?.data;
    }
  };

  // All validation before update

  const form = async (e) => {
    e.preventDefault();

    if (await handleValidation()) {
      updateProfile();
    }
  };

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
      const err = error;
      const response = err.response?.data;
    }
  };

  const handleValidation = async () => {
    let formIsValid = true;

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
      const phoneNumber = parsePhoneNumber(userHp.toString(), "ID");
      if (phoneNumber.isValid() === true) {
        setPhonenumberValidation(true);
        if (userInfo.user_hp !== phoneNumber.number) {
          if (await CheckUserHp(phoneNumber.number)) {
            formIsValid = false;
            setPhonenumberRegistered(true);
          } else {
            setUserHp(phoneNumber.number);
            setPhonenumberRegistered(false);
          }
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

    return formIsValid;
  };

  const setDate = (date) => {
    setStartDate(date);
    setUserDateOfBirth(moment(date).tz("Asia/Jakarta").format("yyyy-MM-DD"));
  };
  return (
    <>
      <div
        className="flex h-full overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
        style={{ backgroundColor: "rgba(128, 128, 128, 0.5)" }}
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto mobile-s:pt-[10rem] tablet:pt-0">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => setModal(false)}
              >
                <svg className="w-5 h-5">
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto max-h-[70vh] px-6 pb-4 space-y-3 lg:px-8 sm:pb-6 xl:pb-8">
              <div className={`pb-2`}>
                <div className={`text-[16px]`}>Nama</div>
                <input
                  type="text"
                  className={`w-[100%] h-[2rem] border rounded-md p-1`}
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    e.target.value !== ""
                      ? setCheckUserName(true)
                      : setCheckUserName(false);
                  }}
                />
                {!checkUserName ? (
                  <>
                    <div className={`text-red-600`}>
                      Nama tidak boleh kosong.
                    </div>
                  </>
                ) : null}
              </div>
              <div className={`pb-2`}>
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
                    name="gender"
                    value="Male"
                    checked={userGender === "Male" ? true : false}
                    onChange={(e) => {
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
                    checked={userGender === "Female" ? true : false}
                    onChange={(e) => {
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
                  value={parseInt(userHp).toString()}
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
                    <div className={`text-red-600`}>Nomor HP tidak valid.</div>
                  </>
                ) : null}
              </div>
              <div className="py-3 text-right">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
                  onClick={form}
                >
                  Simpan perubahan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormEditProfile;
