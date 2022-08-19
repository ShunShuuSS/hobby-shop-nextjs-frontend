import { useRouter } from "next/router";

const TabSeller = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <div className={`w-full mobile-s:block laptop:flex`}>
        <div
          className={`mobile-s:text-[14px] mobile-s:w-auto laptop:w-[12rem] h-full mobile-s:flex laptop:block outline-style-1 rounded-sm laptop:mr-5 bg-white`}
        >
          <div
            className={`w-full py-[0.5rem] rounded-t-sm flex
            hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer
            ${
              router.pathname == "/seller/manage-product"
                ? "bg-blue-700 text-white"
                : ""
            }`}
            onClick={() => router.push("/seller/manage-product")}
          >
            <div
              className={`w-full my-auto mx-2 mobile-s:text-center laptop:text-justify`}
            >
              Atur Produk
            </div>
          </div>
          <div
            className={`w-full py-[0.5rem] flex
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
            <div
              className={`w-full my-auto mx-2 mobile-s:text-center laptop:text-justify`}
            >
              Transaksi
            </div>
          </div>
          <div
            className={`w-full py-[0.5rem] rounded-b-sm flex
            hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer
            ${
              router.pathname == "/seller/setting-store"
                ? "bg-blue-700 text-white"
                : ""
            }`}
            onClick={() => router.push("/seller/setting-store")}
          >
            <div
              className={`w-full my-auto mx-2 mobile-s:text-center laptop:text-justify`}
            >
              Pengaturan Toko
            </div>
          </div>
        </div>
        <div className={`w-full mobile-s:mt-5 laptop:mt-0`}>{children}</div>
      </div>
    </>
  );
};

export default TabSeller;
