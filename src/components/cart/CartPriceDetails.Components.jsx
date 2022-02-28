const CartPriceDetails = () => {
  return (
    <>
      <div className={`w-full border rounded-md`}>
        <div className={`m-[1rem_2rem]`}>
          <div className={`font-bold text-[25px] pb-5`}>Rincian Jumlah</div>
          <div className={`flex justify-between`}>
            <div className={``}>Jumlah Produk</div>
            <div className={``}>9999</div>
          </div>
          <hr />
          <div className={`flex justify-between`}>
            <div className={``}>Total Harga</div>
            <div className={``}>Rp99.999.999</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPriceDetails;
