import { useRouter } from "next/router";

const TabSeller = ({ children }) => {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <>
      <div className={`flex`}>
        <div className={`w-[15%] h-full block border rounded-sm mr-5`}>
          <div
            className={`w-full h-[2.5rem] hover:bg-gray-300 rounded-sm flex ${
              router.pathname == "/seller/manage-product" ? "bg-gray-400" : ""
            }`}
            onClick={() => router.push("/seller/manage-product")}
          >
            <div className={`w-full my-auto mx-2`}>Atur Produk</div>
          </div>
          <div
            className={`w-full h-[2.5rem] hover:bg-gray-300 rounded-sm flex ${
              router.pathname == "/seller/manage-transaction"
                ? "bg-gray-400"
                : ""
            }`}
            onClick={() => router.push("/seller/manage-transaction")}
          >
            <div className={`w-full my-auto mx-2`}>Transaksi</div>
          </div>
          <div
            className={`w-full h-[2.5rem] hover:bg-gray-300 rounded-sm flex`}
          >
            <div className={`w-full my-auto mx-2`}>Pengaturan Toko</div>
          </div>
        </div>
        <div className={`w-[85%]`}>{children}</div>
      </div>
      {/* <div
        className={`w-full h-[2.5rem] hover:bg-slate-300 rounded-sm flex ${addClass}`}
      >
        <div className={`w-full my-auto mx-2`}>{children}</div>
      </div> */}
    </>
  );
};

export default TabSeller;
