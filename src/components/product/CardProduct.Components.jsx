const CardProductComponentNew = () => {
  return (
    <>
      <div className={`card-product`}>
        <img src="/test.jpg" className={`img`} alt="" />
        <div className={`body`}>
          <div className={`title`}>
            Nama Produk Nama Produk Nama Produk Nama Produk Nama Produk Nama
            Produk
          </div>
          <div className={`price`}>Rp9.999.999</div>
          <div className={`location`}>Lokasi</div>
          <div className={`rating`}>Rating</div>
        </div>
      </div>
    </>
  );
};

export default CardProductComponentNew;
