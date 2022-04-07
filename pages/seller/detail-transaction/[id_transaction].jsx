import Link from "next/link";
import ReceiverInformation from "../../../src/components/seller/detail-transaction/ReceriverInformation.Components";
import { useRouter } from "next/router";

const DetailTransaction = () => {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <>
      <div className={`w-full flex`}>
        <div className={`w-[10rem]`}>
          Nomor Pemesanan<span className={`float-right`}>:&nbsp;</span>
        </div>
        <div className={`w-auto font-bold`}>INV/TANGGAL/RANDOM</div>
      </div>
      <div className={`flex justify-between`}>
        <div className={`w-auto flex`}>
          <div className={`w-[10rem]`}>
            Penjual<span className={`float-right`}>:&nbsp;</span>
          </div>
          <div
            className={`w-auto break-words whitespace-normal overflow-hidden webkit-box webkit-box-vertical text-ellipsis`}
          >
            Adidas
          </div>
        </div>

        <div className={`w-[30rem] h-full`}>
          <ReceiverInformation></ReceiverInformation>
        </div>
      </div>
      <hr className={`my-3 w-full`} />
      <div className={`flex justify-between`}>
        <div className={`w-[50%]`}>Informasi Produk</div>
        <div className={`w-[10%] text-right`}>Jumlah</div>
        <div className={`w-[15%] text-right`}>Harga Satuan</div>
        <div className={`w-[20%] text-right`}>Total Harga</div>
      </div>
      <hr className={`my-3`} />
      <div className={`flex justify-between`}>
        <div
          className={`w-[50%] break-words whitespace-normal overflow-hidden webkit-box webkit-box-vertical text-ellipsis`}
        >
          <Link href={`/1/1`}>
            <a>
              <div className={``}>
                Raket Ampas Raket Ampas Raket Ampas Raket Ampas Raket Ampas
                Raket Ampas Raket Ampas Raket Ampas
              </div>
            </a>
          </Link>
        </div>
        <div className={`w-[10%] text-right`}>5</div>
        <div className={`w-[15%] text-right`}>Rp99.999.999</div>
        <div className={`w-[20%] text-right`}>Rp99.999.999</div>
      </div>
      <hr className={`my-3`} />
      <div className={`flex justify-end`}>
        <div className={`w-[10rem] font-bold`}>Total Transaksi</div>
        <div className={`w-[15rem] text-right`}>Rp99.999.999</div>
      </div>
    </>
  );
};

export default DetailTransaction;
