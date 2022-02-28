import styles from '../../styles/components/product/CardProduct.module.scss'

const CardProductComponentNew = () => {
    return (
        <>
            <div className={`card-product`}>
                <img src="/test.jpg" className={`img`} alt="" />
                <div className={`body`}>
                    <div className={`title`}>
                        Nama Produk Nama Produk Nama Produk Nama Produk Nama Produk Nama Produk
                    </div>
                    <div className={`price`}>
                        Rp9.999.999
                    </div>
                    <div className={`location`}>
                        Lokasi
                    </div>
                    <div className={`rating`}>
                        Rating
                    </div>
                </div>
            </div>
        </>
    )
}

const CardProductComponent = () => {
    return (
        <>
            <div className={`${styles.card}`}>
                <div className={`${styles.card_image}`}>
                    <img src="/test.jpg" className={`${styles.image}`} alt="" />
                </div>
                <div className={`${styles.card_body}`}>
                    <div className={`${styles.title}`}>
                        Nama Produk Nama Produk Nama Produk Nama Produk Nama Produk Nama Produk
                    </div>
                    <div className={`${styles.price}`}>
                        Rp9.999.999
                    </div>
                    <div className={`${styles.location}`}>
                        Lokasi
                    </div>
                    <div className={`${styles.rating}`}>
                        Rating
                    </div>
                </div>

            </div>
        </>
    )
}

export default CardProductComponentNew