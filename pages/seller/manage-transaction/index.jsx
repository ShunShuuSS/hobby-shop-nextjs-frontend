import { useRef, useState, useEffect } from "react";
import CardTransaction from "../../../src/components/seller/CardTransaction.Components";
import TabTransaction from "../../../src/components/seller/TabTransaction.Components";
const SellerTransaction = () => {
  const [TabsToggle, setTabsToggle] = useState(2);
  // setiap kali nilai state nya berubah maka harus melakukan fetching ulang untuk mengambil data terbaru
  const [TabsTransactionToogle, setTabsTransactionToogle] = useState(1);
  return (
    <>
      <div>
        <div className={`${TabsToggle === 2 ? "" : "hidden"}`}>
          <div className={`flex`}>
            <div onClick={() => setTabsTransactionToogle(1)}>
              <TabTransaction
                addClass={`${TabsTransactionToogle === 1 ? "bg-gray-300" : ""}`}
              >
                Pesanan Baru
              </TabTransaction>
            </div>

            <div onClick={() => setTabsTransactionToogle(2)}>
              <TabTransaction
                addClass={`${TabsTransactionToogle === 2 ? "bg-gray-300" : ""}`}
              >
                Pesanan Diproses
              </TabTransaction>
            </div>

            <div onClick={() => setTabsTransactionToogle(3)}>
              <TabTransaction
                addClass={`${TabsTransactionToogle === 3 ? "bg-gray-300" : ""}`}
              >
                Pesanan Dikirim
              </TabTransaction>
            </div>

            <div onClick={() => setTabsTransactionToogle(4)}>
              <TabTransaction
                addClass={`${TabsTransactionToogle === 4 ? "bg-gray-300" : ""}`}
              >
                Pesanan Selesai
              </TabTransaction>
            </div>
          </div>
          <div className={`m-2`}>
            <hr />
          </div>
          <div className={`block`}>
            <div className={`${TabsTransactionToogle === 1 ? "" : "hidden"}`}>
              <CardTransaction
                invoice={`Nomor Pemesanan INV/TANGGAL/RANDOM`}
                product_name={`Nama Produk Nama Produk Nama Produk Nama Produk Nama Produk Nama
                Produk Nama Produk Nama Produk Nama Produk Nama Produk Nama
                Produk Nama Produk Nama Produk`}
                qty={5}
                price={99999999}
                img={`/test1.jpg`}
              ></CardTransaction>
            </div>
            <div className={`${TabsTransactionToogle === 2 ? "" : "hidden"}`}>
              <CardTransaction
                invoice={`Nomor Pemesanan INV/TANGGAL/RANDOM`}
                product_name={`Nama Produk Nama Produk Nama Produk Nama Produk Nama Produk Nama
                Produk Nama Produk Nama Produk Nama Produk Nama Produk Nama
                Produk Nama Produk Nama Produk`}
                qty={5}
                price={99999999}
                img={`/test1.jpg`}
              ></CardTransaction>
            </div>
            <div className={`${TabsTransactionToogle === 3 ? "" : "hidden"}`}>
              <CardTransaction
                invoice={`Nomor Pemesanan INV/TANGGAL/RANDOM`}
                product_name={`Nama Produk Nama Produk Nama Produk Nama Produk Nama Produk Nama
                Produk Nama Produk Nama Produk Nama Produk Nama Produk Nama
                Produk Nama Produk Nama Produk`}
                qty={5}
                price={99999999}
                img={`/test1.jpg`}
              ></CardTransaction>
            </div>
            <div className={`${TabsTransactionToogle === 4 ? "" : "hidden"}`}>
              <CardTransaction
                invoice={`Nomor Pemesanan INV/TANGGAL/RANDOM`}
                product_name={`Nama Produk Nama Produk Nama Produk Nama Produk Nama Produk Nama
                Produk Nama Produk Nama Produk Nama Produk Nama Produk Nama
                Produk Nama Produk Nama Produk`}
                qty={5}
                price={99999999}
                img={`/test1.jpg`}
              ></CardTransaction>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerTransaction;
