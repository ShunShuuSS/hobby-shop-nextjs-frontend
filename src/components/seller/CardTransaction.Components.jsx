import Link from "next/link";

const CardTransaction = ({
  transaction_id,
  invoice,
  product_name,
  qty,
  price,
  img,
}) => {
  //transaction_id akan digunakan jika menerima pesanan (mengubah status pesanan) dan untuk melihat rincian pesanan
  /* buat sebuah fungsi yang untuk menerima transaction_id kemudian mengupdate nya dan
    memakai usestate untuk memunculkan popup "pesanan diterim"
 */
  return (
    <>
      <div className={`w-full border rounded-md mb-5`}>
        <div className={`block m-5`}>
          <div className={`flex font-bold`}>
            <div className={``}>{invoice}</div>
          </div>

          <div className={`flex justify-between`}>
            <div className={`w-[15%]`}>
              <img src={img} className={`w-full rounded-md`} alt="" />
            </div>
            <div className={`w-[80%] block relative`}>
              <div
                className={`text-[17px] break-words whitespace-normal overflow-hidden webkit-box webkit-box-vertical webkit-line-clamp-1 text-ellipsis`}
              >
                {product_name}
              </div>
              <div className={`text-[20px]`}>
                {qty} x Rp{price}
              </div>
              <hr />
              <div
                className={`w-full h-[4rem] flex justify-between bottom-0 absolute`}
              >
                <div className={`w-[25%] border rounded-md`}>
                  <div className={`m-2 block`}>
                    <div className={`font-bold`}>Total Harga</div>
                    <div>Rp{qty * price}</div>
                  </div>
                </div>

                <Link href="/seller/detail-transaction/1" className={``}>
                  <a
                    className={`w-[25%] h-[3rem] flex mt-auto border rounded-md cursor-pointer`}
                  >
                    <div className={`flex m-auto`}>
                      <div className={``}>Rincian Pesanan</div>
                    </div>
                  </a>
                </Link>

                <div
                  className={`w-[25%] h-[3rem] flex mt-auto border rounded-md cursor-pointer`}
                >
                  <div className={`flex m-auto`}>Terima Pesanan</div>
                </div>
                <div
                  className={`w-[2.5rem] h-[2.5rem] flex mt-auto border rounded-md cursor-pointer`}
                >
                  <img
                    src={`/navigationbar/navbar.png`}
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

export default CardTransaction;
