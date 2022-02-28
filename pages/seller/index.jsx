import { useState } from "react";
import CardTransaction from "../../src/components/seller/CardTransaction.Components";
import Tab from "../../src/components/seller/Tab.Components";
import TabTransaction from "../../src/components/seller/TabTransaction.Components";

const SellerIndex = () => {
  const [TabsToggle, setTabsToggle] = useState(2);
  const [TabsTransactionToogle, setTabsTransactionToogle] = useState(1);
  return (
    <>
      <div className={`flex`}>
        <div className={`w-[15%] h-full block border rounded-sm mr-5`}>
          <div onClick={() => setTabsToggle(1)}>
            <Tab addClass={`${TabsToggle === 1 ? "bg-gray-300" : ""}`}>
              Atur Produk
            </Tab>
          </div>
          <div onClick={() => setTabsToggle(2)}>
            <Tab addClass={`${TabsToggle === 2 ? "bg-gray-300" : ""}`}>
              Transaksi
            </Tab>
          </div>
        </div>

        <div className={`w-[85%]`}>
          <div className={`${TabsToggle === 1 ? "" : "hidden"}`}>
            <div>Produk</div>
          </div>
          <div className={`${TabsToggle === 2 ? "" : "hidden"}`}>
            <div className={`flex`}>
              <div onClick={() => setTabsTransactionToogle(1)}>
                <TabTransaction
                  addClass={`${
                    TabsTransactionToogle === 1 ? "bg-gray-300" : ""
                  }`}
                >
                  Pesanan Baru
                </TabTransaction>
              </div>

              <div onClick={() => setTabsTransactionToogle(2)}>
                <TabTransaction
                  addClass={`${
                    TabsTransactionToogle === 2 ? "bg-gray-300" : ""
                  }`}
                >
                  Pesanan Diproses
                </TabTransaction>
              </div>

              <div onClick={() => setTabsTransactionToogle(3)}>
                <TabTransaction
                  addClass={`${
                    TabsTransactionToogle === 3 ? "bg-gray-300" : ""
                  }`}
                >
                  Pesanan Dikirim
                </TabTransaction>
              </div>

              <div onClick={() => setTabsTransactionToogle(4)}>
                <TabTransaction
                  addClass={`${
                    TabsTransactionToogle === 4 ? "bg-gray-300" : ""
                  }`}
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
                <CardTransaction></CardTransaction>
              </div>
              <div className={`${TabsTransactionToogle === 2 ? "" : "hidden"}`}>
                <CardTransaction></CardTransaction>
              </div>
              <div className={`${TabsTransactionToogle === 3 ? "" : "hidden"}`}>
                <CardTransaction></CardTransaction>
              </div>
              <div className={`${TabsTransactionToogle === 4 ? "" : "hidden"}`}>
                <CardTransaction></CardTransaction>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerIndex;
