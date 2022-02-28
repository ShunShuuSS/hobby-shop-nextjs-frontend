import Head from "next/head";
import Link from "next/link";
import CardQuantity from "../src/components/cart/CartQuantity.Components";
import NavigationBar from "../components/NavigationBar.Components";
import CartCardProduct from "../src/components/cart/CartCardProduct.Components";
import Container from "../src/components/container/Container.Components";
import CartPriceDetails from "../src/components/cart/CartPriceDetails.Components";
const CartPage = () => {
  return (
    <>
      <Head>
        <title>Keranjang</title>
      </Head>
      <div className={`cart-page`}>
        <div className="cart-product-section">
          <CartCardProduct
            storeName={`Nama Toko`}
            productImg={`/test1.jpg`}
            productName={`Nama Produk Nama Produk Nama Produk Nama Produk Nama Produk Nama Produk Nama Produk Nama Produk Nama Produk Nama Produk`}
            productPrice={`Rp99.999.99`}
            productQty={5}
          />
        </div>
        <div className={`cart-price-details-section`}>
          <CartPriceDetails></CartPriceDetails>
        </div>

        {/* <div className={`cart-padding`}></div> */}
        {/* <div className={`cart-price-details`}>
            <div className={`card`}>
              <div className={`title`}>Rincian Jumlah</div>
              <div className={`quantity-total`}>
                <div className={``}>Jumlah Produk</div>
                <div className={``}>9999</div>
              </div>
              <hr />
              <div className={`price-total`}>
                <div className={``}>Total Harga</div>
                <div className={``}>Total Harga</div>
              </div>
            </div>
          </div> */}
      </div>
    </>
  );
};

export default CartPage;
