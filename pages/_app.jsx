import axios from "axios";

import "../styles/globals.scss";
import Layout from "../src/components/Layout";
import UserContextProvider from "../src/context/user.context.provider";
import CartContextProvider from "../src/context/cart.context.provider";
var moment = require("moment-timezone");

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL_API;

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Layout>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </Layout>
    </UserContextProvider>
  );
}

export default MyApp;
