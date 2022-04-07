import axios from "axios";

import "../styles/globals.scss";
import Layout from "../src/components/Layout";
import LoginContextProvider from "../src/context/login.context.provider";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL_API;

function MyApp({ Component, pageProps }) {
  return (
    <LoginContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LoginContextProvider>
  );
}

export default MyApp;
