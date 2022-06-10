import { useRouter } from "next/router";

const TabSeller = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <div className={`flex`}>
        <div className={`w-[15%] h-full block outline-style-1 rounded-sm mr-5`}>
          <div
            className={`w-full h-[2.5rem] rounded-t-sm flex
            hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer
            ${
              router.pathname == "/seller/manage-product"
                ? "bg-blue-700 text-white"
                : ""
            }`}
            onClick={() => router.push("/seller/manage-product")}
          >
            <div className={`w-full my-auto mx-2`}>Atur Produk</div>
          </div>
          <div
            className={`w-full h-[2.5rem] flex
            hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer
            ${
              router.pathname.substring(
                0,
                "/seller/manage-transaction".length
              ) == "/seller/manage-transaction"
                ? "bg-blue-700 text-white"
                : ""
            }`}
            onClick={() => router.push("/seller/manage-transaction")}
          >
            <div className={`w-full my-auto mx-2`}>Transaksi</div>
          </div>
          <div
            className={`w-full h-[2.5rem] rounded-b-sm flex
            hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer
            ${
              router.pathname == "/seller/setting-store"
                ? "bg-blue-700 text-white"
                : ""
            }`}
            onClick={() => router.push("/seller/setting-store")}
          >
            <div className={`w-full my-auto mx-2`}>Pengaturan Toko</div>
          </div>
        </div>
        <div className={`w-[85%]`}>{children}</div>
      </div>
    </>
  );
};

export default TabSeller;
