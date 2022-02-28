const CardProductTransaction = () => {
  return (
    <>
      <div className={`w-full border rounded-md mb-5`}>
        <div className={`block m-5`}>
          <div className={`flex justify-between font-bold`}>
            <div className={``}>Nama Toko</div>
            <div className={``}>Nomor Pemesanan INV/TANGGAL/RANDOM</div>
          </div>

          <div className={`flex justify-between`}>
            <div className={`w-[15%]`}>
              <img src="/test1.jpg" className={`w-full rounded-md`} alt="" />
            </div>
            <div className={`w-[80%] block relative`}>
              <div
                className={`text-[17px] break-words whitespace-normal overflow-hidden webkit-box webkit-box-vertical webkit-line-clamp-1 text-ellipsis`}
              >
                Nama Produk Nama Produk Nama Produk Nama Produk Nama Produk Nama
                Produk Nama Produk Nama Produk Nama Produk Nama Produk Nama
                Produk Nama Produk Nama Produk
              </div>
              <div className={`text-[20px]`}>Qty 5 x Rp99.999.999</div>
              <hr />
              <div
                className={`w-full h-[4rem] flex justify-between bottom-0 absolute`}
              >
                <div className={`w-[25%] border rounded-md`}>
                  <div className={`m-2 block`}>
                    <div className={`font-bold`}>Total Harga</div>
                    <div>Rp99.999.999</div>
                  </div>
                </div>
                <div
                  className={`w-[25%] h-[3rem] flex mt-auto border rounded-md cursor-pointer`}
                >
                  <div className={`flex m-auto`}>Rincian Pesanan</div>
                </div>
                <div
                  className={`w-[25%] h-[3rem] flex mt-auto border rounded-md cursor-pointer`}
                >
                  <div className={`flex m-auto`}> gk tau isi apa</div>
                </div>
                <div
                  className={`w-[2.5rem] h-[2.5rem] flex mt-auto border rounded-md`}
                >
                  <img
                    src="/navigationbar/navbar.png"
                    className="flex m-auto w-[2rem] h-[2rem]"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProductTransaction;
