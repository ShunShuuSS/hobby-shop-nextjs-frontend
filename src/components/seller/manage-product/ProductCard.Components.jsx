import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import helper from "../../../helper";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const [ListProductEdit, setListProductEdit] = useState(false);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setListProductEdit(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  function OutsideAlerter(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return <div ref={wrapperRef}>{props.children}</div>;
  }
  OutsideAlerter.propTypes = {
    children: PropTypes.element.isRequired,
  };
  return (
    <>
      <div className={`w-full border rounded-md mb-5`}>
        <div className={`block m-3`}>
          <div className={`flex justify-between`}>
            <div className={`w-[10%] h-[6rem]`}>
              <img
                src={
                  product.product_img === null
                    ? `/no-image.png`
                    : `http://localhost:5000/` +
                      product.product_img +
                      `_150` +
                      `.webp`
                }
                className={`object-cover w-[6rem] h-[6rem] rounded-md ring-1 ring-gray-200 ring-offset-0`}
                alt=""
              />
            </div>
            <div className={`w-[88%] block relative`}>
              <div
                className={`text-[17px] break-words whitespace-normal overflow-hidden webkit-box webkit-box-vertical webkit-line-clamp-1 text-ellipsis`}
              >
                {product.product_name}
              </div>
              <div className={`flex`}>
                <div className={`w-[25%] border rounded-md`}>
                  <div className={`m-2 block`}>
                    <div className={`font-bold`}>Harga</div>
                    <div>{helper.rupiahCurrency(product.product_price)}</div>
                  </div>
                </div>
                <div className="mr-2"></div>
                <div className={`w-[25%] border rounded-md`}>
                  <div className={`m-2 block`}>
                    <div className={`font-bold`}>Jumlah Stok</div>
                    <div>{product.product_quantity}</div>
                  </div>
                </div>
              </div>
              <OutsideAlerter>
                <div className={`absolute bottom-0 right-0`}>
                  <div
                    className={`group inline-block relative my-auto cursor-pointer`}
                  >
                    <div
                      className={`w-[2.5rem] h-[2.5rem] flex my-auto border rounded-md cursor-pointer bg-blue-700 hover:bg-blue-800`}
                      onClick={() => {
                        ListProductEdit === false
                          ? setListProductEdit(true)
                          : setListProductEdit(false);
                      }}
                    >
                      <img
                        src={`/assets/seller/navbar-white.png`}
                        className="flex m-auto w-[2rem] h-[2rem] "
                        alt=""
                      />
                    </div>
                    <ul
                      className={`absolute ${
                        ListProductEdit === true ? "block" : "hidden"
                      } z-[50] w-[10rem] right-0`}
                    >
                      <div className={`outline-style-1 border-black rounded`}>
                        <Link
                          href={`/seller/edit-product/${product.product_id}`}
                        >
                          <a
                            className={`bg-white rounded hover:bg-gray-400 py-2 px-4 block`}
                          >
                            Edit
                          </a>
                        </Link>

                        <Link href={`/`}>
                          <a
                            className={`bg-white rounded hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap`}
                          >
                            Nonaktifkan
                          </a>
                        </Link>
                        <Link href={`/`}>
                          <a
                            className={`bg-white rounded hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap`}
                          >
                            Hapus
                          </a>
                        </Link>
                      </div>
                    </ul>
                  </div>
                </div>
              </OutsideAlerter>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
