import axios from "axios";
import Router from "next/router";
import { useContext, useState, useEffect } from "react";
import LoginContext from "../src/context/login.context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginContext = useContext(LoginContext);

  const userLogin = async () => {
    const userLoginData = {
      user_email: email,
      user_password: password,
    };
    try {
      const checkUserEmail = await axios.post("api/auth/login", userLoginData);
      loginContext.SetToken(checkUserEmail.data.data.token);
      Router.push(`/`);
    } catch (error) {}
  };

  const form = (e) => {
    e.preventDefault();
    userLogin();
  };

  useEffect(() => {
    if (loginContext.UserToken) {
      Router.push(`/`);
    }
  }, [loginContext]);

  return (
    <>
      <form onSubmit={form}>
        {console.log()}
        <div>
          <div>Email</div>
          <input
            type="text"
            className={`border`}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div>Password</div>
          <input
            type="text"
            className={`border`}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={`border`}>
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
