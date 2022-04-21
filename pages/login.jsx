import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import { useContext, useState, useEffect } from "react";
import UserContext from "../src/context/user.context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkEmailPassword, setCheckEmailPassword] = useState(false);
  const [showPassword, setShowPassword] = useState("password");
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.UserToken) {
      Router.push(`/`);
    }
  }, [userContext.UserToken]);

  const UserLogin = async () => {
    const userLoginData = {
      user_email: email,
      user_password: password,
    };
    try {
      const login = await axios.post("api/auth/login", userLoginData);
      console.log(login);
      userContext.SetToken(login.data.data.token);
      setCheckEmailPassword(false);
    } catch (error) {
      setCheckEmailPassword(true);
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
    UserLogin();
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={`flex justify-center w-full`}>
        <div className={`block border rounded-md w-[25rem] py-5`}>
          <div className={`text-center text-[30px]`}>Login</div>
          <form onSubmit={form}>
            <div className={`flex justify-center w-[full]`}>
              <div className={`block w-[70%]`}>
                <div className={`text-[18px]`}>Email</div>
                <input
                  type="text"
                  className={`w-[100%] h-[2rem] border rounded-md p-1`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className={`text-[18px]`}>Password</div>
                <input
                  type={`${showPassword}`}
                  className={`w-full h-[2rem] border rounded-md p-1`}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className={`${
                    checkEmailPassword ? "" : "hidden"
                  } text-red-600`}
                >
                  Email atau Password salah. Silahkan untuk dicek kembali.
                </div>
                <input type="checkbox" onChange={ShowPassword} />{" "}
                <span>Tampilkan password</span>
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
