/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import IsEmail from "isemail";
import Head from "next/head";
import Router from "next/router";
import { useContext, useState, useEffect } from "react";
import CustomNotification from "../src/components/notification/CustomNotification.Components";
import UserContext from "../src/context/user.context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkUserLogin, setCheckUserLogin] = useState(true);
  const [showPassword, setShowPassword] = useState("password");
  const [error, setError] = useState(false);

  const [emailNotNull, setEmailNotNull] = useState(true);
  const [passwordNotNull, setPasswordNotNull] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.UserToken) {
      Router.push(userContext.LastPage);
    }
  }, [userContext.UserToken]);

  const UserLogin = async () => {
    const userLoginData = {
      user_email: email,
      user_password: password,
    };
    try {
      const login = await axios.post("api/auth/login", userLoginData);
      if (login.data.data.token) {
        userContext.SetToken(login.data.data.token);
        setCheckUserLogin(true);
      } else {
        setCheckUserLogin(false);
      }
    } catch (error) {
      setError(true);
    }
  };

  const ShowPassword = (e) => {
    if (e.target.checked == true) {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  const form = (e) => {
    e.preventDefault();
    if (HandleValidationLogin()) {
      UserLogin();
    }
  };

  const emailValidation = () => {
    if (IsEmail.validate(email)) {
      return true;
    } else {
      return false;
    }
  };

  const HandleValidationLogin = () => {
    let formIsValid = true;

    if (email === "") {
      formIsValid = false;
      setEmailNotNull(false);
      setEmailValid(true);
      setCheckUserLogin(true);
    } else {
      if (emailValidation()) {
        setEmailNotNull(true);
        setEmailValid(true);
        setCheckUserLogin(true);
      } else {
        formIsValid = false;
        setEmailValid(false);
        setCheckUserLogin(true);
      }
    }

    if (password === "") {
      formIsValid = false;
      setPasswordNotNull(false);
      setCheckUserLogin(true);
    } else {
      setPasswordNotNull(true);
      setCheckUserLogin(true);
    }
    return formIsValid;
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      {error ? (
        <>
          <CustomNotification
            show={error}
            text={"Terjadi kesalahan pada halaman Login"}
            goToRouteText={"Muat ulang halaman"}
            goToRoute={"/login"}
          />
        </>
      ) : null}

      <div className={`flex justify-center w-full`}>
        <div className={`block border rounded-md w-[25rem] py-5`}>
          <div className={`text-center text-[30px]`}>Login</div>
          <form onSubmit={form}>
            <div className={`flex justify-center w-[full]`}>
              <div className={`block w-[70%]`}>
                <div className={`text-[18px]`}>Email</div>
                <input
                  type="text"
                  id="email"
                  className={`w-[100%] h-[2rem] border rounded-md p-1`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailNotNull ? null : (
                  <>
                    <label htmlFor="email" className={`text-red-600`}>
                      Email tidak boleh kosong.
                    </label>
                  </>
                )}
                {emailValid ? null : (
                  <>
                    <label htmlFor="email" className={`text-red-600`}>
                      Email tidak valid.
                    </label>
                  </>
                )}

                <div className={`text-[18px]`}>Password</div>
                <input
                  type={`${showPassword}`}
                  id="password"
                  className={`w-full h-[2rem] border rounded-md p-1`}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordNotNull ? null : (
                  <>
                    <label htmlFor="password" className={`text-red-600`}>
                      Password tidak boleh kosong.
                    </label>
                  </>
                )}

                {checkUserLogin ? null : (
                  <>
                    <label className={`text-red-600`}>
                      Email atau Password salah. Silahkan untuk dicek kembali.
                    </label>
                  </>
                )}
                <br />
                <input
                  type="checkbox"
                  id="showpassword"
                  onChange={ShowPassword}
                />
                <label htmlFor="showpassword">
                  <span>Tampilkan password</span>
                </label>
                <button
                  type="submit"
                  className={`w-full border rounded-md mt-5`}
                >
                  <div className={`text-[20px] font-bold p-2`}>Login</div>
                </button>
                <div
                  className={`w-full border rounded-md mt-5 cursor-pointer`}
                  onClick={() => Router.push("/register")}
                >
                  <div className={`text-[20px] font-bold p-2 text-center`}>
                    Register
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

export default Login;
