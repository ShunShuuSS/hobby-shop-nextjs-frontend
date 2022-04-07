import Link from "next/link";

const CardProduct = ({
  product_id,
  store_id,
  product_name,
  product_price,
  product_rating,
}) => {
  return (
    <>
      <Link href={`/${store_id}/${product_id}`}>
        <a>
          <div className={`card-product`}>
            <img src="/test.jpg" className={`img`} alt="" />
            <div className={`body`}>
              <div className={`title`}>{product_name}</div>
              <div className={`price`}>{"Rp." + product_price}</div>
              <div className={`location`}>Lokasi</div>
              <div className={`rating`}>
                {product_rating == 0 ? "Belum ada rating" : product_rating}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};

export default CardProduct;
