import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import ProfileNavigation from "../../src/components/navbar/ProfileNavigation.Components";
import ProfileNavigationOption from "../../src/components/navbar/ProfileNavigationOption.Components";
import CardTransaction from "../../src/components/seller/CardTransaction.Components";
import Tab from "../../src/components/seller/Tab.Components";
import TabTransaction from "../../src/components/seller/TabTransaction.Components";
import { useRouter } from "next/router";

const SellerIndex = () => {
  const router = useRouter();
  console.log(router.pathname);
  const [TabsToggle, setTabsToggle] = useState(2);
  // setiap kali nilai state nya berubah maka harus melakukan fetching ulang untuk mengambil data terbaru
  const [TabsTransactionToogle, setTabsTransactionToogle] = useState(1);
  // setiap kali nilai state nya berubah maka harus melakukan fetching ulang untuk mengambil status transaksi yang berbeda
  const [ListProductEdit, setListProductEdit] = useState(false);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setListProductEdit(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  function OutsideAlerter(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return <div ref={wrapperRef}>{props.children}</div>;
  }
  OutsideAlerter.propTypes = {
    children: PropTypes.element.isRequired,
  };

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
            <div>
              <div className={`flex justify-end`}>
                <div
                  className={`flex border rounded-md h-[2.5rem] hover:bg-gray-300`}
                >
                  <Link href={`/seller/add-product`}>
                    <div className={`mx-3 my-auto`}>Tambah Produk</div>
                  </Link>
                </div>
              </div>
              <div className={`my-2`}></div>
              <div className={`w-full border rounded-md mb-5`}>
                <div className={`block m-5`}>
                  <div className={`flex justify-between`}>
                    <div className={`w-[10%]`}>
                      <img
                        src="/test1.jpg"
                        className={`w-full rounded-md`}
                        alt=""
                      />
                    </div>
                    <div className={`w-[85%] block relative`}>
                      <div
                        className={`text-[17px] break-words whitespace-normal overflow-hidden webkit-box webkit-box-vertical webkit-line-clamp-1 text-ellipsis`}
                      >
                        Nama Produk Nama Produk Nama Produk Nama Produk Nama
                        Produk Nama Produk Nama Produk Nama Produk Nama Produk
                        Nama Produk Nama Produk Nama Produk Nama Produk
                      </div>
                      <div className={`flex`}>
                        <div className={`w-[25%] border rounded-md`}>
                          <div className={`m-2 block`}>
                            <div className={`font-bold`}>Harga</div>
                            <div>Rp99.999.999</div>
                          </div>
                        </div>
                        <div className="mr-2"></div>
                        <div className={`w-[25%] border rounded-md`}>
                          <div className={`m-2 block`}>
                            <div className={`font-bold`}>Jumlah Stok</div>
                            <div>9999</div>
                          </div>
                        </div>
                      </div>
                      <OutsideAlerter>
                        <div className={`absolute bottom-0 right-0`}>
                          <div
                            className={`group inline-block relative my-auto cursor-pointer`}
                          >
                            <div
                              className={`w-[2.5rem] h-[2.5rem] flex my-auto border rounded-md cursor-pointer`}
                              onClick={() => {
                                ListProductEdit === false
                                  ? setListProductEdit(true)
                                  : setListProductEdit(false);
                              }}
                            >
                              <img
                                src={`/navigationbar/navbar.png`}
                                className="flex m-auto w-[2rem] h-[2rem]"
                                alt=""
                              />
                            </div>
                            <ul
                              className={`absolute ${
                                ListProductEdit === true ? "block" : "hidden"
                              } w-[10rem] right-0`}
                            >
                              <div className={`border border-black rounded`}>
                                <Link href={`/seller/edit-product/1`}>
                                  <a
                                    className={`bg-white rounded hover:bg-gray-400 py-2 px-4 block`}
                                  >
                                    Edit
                                  </a>
                                </Link>

                                <Link href={`/`}>
                                  <a
                                    className={`bg-white rounded hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap`}
                                  >
                                    Nonaktifkan
                                  </a>
                                </Link>
                                <Link href={`/`}>
                                  <a
                                    className={`bg-white rounded hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap`}
                                  >
                                    Hapus
                                  </a>
                                </Link>
                              </div>
                            </ul>
                          </div>
                        </div>
                      </OutsideAlerter>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className={`${TabsToggle === 2 ? "" : "hidden"}`}>
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SellerIndex;
