/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import AuthCode from "react-auth-code-input";
import { useCountdown } from "../../../hooks/useCountdown";

const CustomVerificationCode = ({
  show,
  toEmail,
  setInputResult,
  NotifNotSuccess,
  notifOtpExpired,
  RequestEmailVerification,
}) => {
  const [countDownActive, setCountDownActive] = useState(true);
  const [resendActice, setResendActice] = useState(false);

  const [countDown, modifyCountDown] = useCountdown({
    interval: 1000,
    isIncrement: false,
    seconds: 60,
  });
  const router = useRouter();

  useEffect(() => {
    setCountDownActive(true);
    modifyCountDown.reset();
    modifyCountDown.start();
  }, [show]);

  useEffect(() => {
    if (countDown === 0) {
      setCountDownActive(false);
      modifyCountDown.stop();
    }
  }, [countDown]);

  const handleChangeInputResult = (res) => {
    setInputResult(res);
  };

  const handleCompleteCountdown = () => {
    setCountDownActive(true);
    modifyCountDown.reset();
    modifyCountDown.start();
    RequestEmailVerification();
  };

  const handleResendCode = () => {};

  return (
    <>
      {show ? (
        <>
          <div
            className={`flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center`}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className={`relative p-4 w-full max-w-md h-full md:h-auto`}>
              <div
                className={`relative bg-white rounded-lg shadow dark:bg-gray-700`}
              >
                <div className="bg-white h-64 py-3 rounded text-center">
                  <h1 className="text-2xl font-bold">Kode Verifikasi</h1>
                  <div className="flex flex-col mt-4">
                    <span>Masukkan kode verifikasi</span>
                    <span>
                      dikirim ke <span className="font-bold">{toEmail}</span>
                    </span>
                  </div>
                  <AuthCode
                    allowedCharacters="numeric"
                    onChange={handleChangeInputResult}
                    inputClassName={`m-2 border h-10 w-10 text-center form-control rounded`}
                    autoFocus={true}
                    disabled={false}
                    length={6}
                  />
                  <div className="flex justify-center mt-5">
                    <div className="text-center">
                      <div className="flex justify-center items-center text-red-600 cursor-pointer">
                        {NotifNotSuccess ? (
                          <>
                            <p>Kode OTP yang anda masukkan salah.</p>
                          </>
                        ) : null}
                        {notifOtpExpired ? (
                          <>
                            <p>Kode OTP sudah kedaluwarsa.</p>
                          </>
                        ) : null}
                      </div>
                      <div className="flex justify-center items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                        {countDownActive ? (
                          <>
                            <p>tunggu {countDown} untuk kirim kode OTP lagi.</p>
                          </>
                        ) : (
                          <p
                            className="font-bold"
                            onClick={handleCompleteCountdown}
                          >
                            Kirim kode OTP
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* <h1 className="text-2xl font-bold">OTP Verification</h1>
                  <div className="flex flex-col mt-4">
                    <span>Enter the OTP you received at</span>
                    <span className="font-bold">+91 ******876</span>
                  </div>

                  <div
                    id="otp"
                    className="flex flex-row justify-center text-center px-2 mt-5"
                  >
                    <input
                      className="m-2 border h-10 w-10 text-center form-control rounded"
                      type="number"
                      id="inputCode"
                      maxLength="1"
                      ref={inputRef}
                      onChange={(e) => setInputCode({ input1: e.target.value })}
                    />
                    <input
                      className="m-2 border h-10 w-10 text-center form-control rounded"
                      type="text"
                      id="inputCode"
                      maxLength="1"
                      ref={inputRef}
                    />
                    <input
                      className="m-2 border h-10 w-10 text-center form-control rounded"
                      type="text"
                      id="inputCode"
                      maxLength="1"
                    />
                    <input
                      className="m-2 border h-10 w-10 text-center form-control rounded"
                      type="text"
                      id="inputCode"
                      maxLength="1"
                    />
                    <input
                      className="m-2 border h-10 w-10 text-center form-control rounded"
                      type="text"
                      id="inputCode"
                      maxLength="1"
                    />
                    <input
                      className="m-2 border h-10 w-10 text-center form-control rounded"
                      type="text"
                      id="inputCode"
                      maxLength="1"
                    />
                  </div>

                  <div className="flex justify-center text-center mt-5">
                    <a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                      <span className="font-bold">Resend OTP</span>
                      <i className="bx bx-caret-right ml-1"></i>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default CustomVerificationCode;
