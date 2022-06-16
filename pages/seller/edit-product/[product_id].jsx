/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";
import config from "../../../constants/config";
import NotificationManageProductSuccess from "../../../src/components/seller/notification/ManageProductSuccessNotif.Components";
import UserContext from "../../../src/context/user.context";

const EditProduct = () => {
  // input field
  const [productImage, setProductImage] = useState([]);
  const [productNewImage, setProductNewImage] = useState([]);
  const [removedImg, setRemovedImg] = useState([]); // list of image to be deleted from DB
  const [productName, setProductName] = useState("");
  const [productDetail, setproductDetail] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productStatus, setProductStatus] = useState(true);

  // helper
  const [validationInput, setValidationInput] = useState({
    img: true,
    name: true,
    detail: true,
    quantity: true,
    price: true,
  });
  const [loadingUpdate, setLoadingUpdate] = useState({
    formButton: false,
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // useContext
  const userContext = useContext(UserContext);

  // variable
  const router = useRouter();

  useEffect(() => {
    if (userContext.CompleteLoad == true) {
      if (userContext.UserToken !== "") {
        if (userContext.StoreInfo.length === 0) {
          router.push("/seller/register-store");
        }
        getProductData();
      }
    }
  }, [userContext.CompleteLoad]);

  const getProductData = async () => {
    let files_list = [];
    try {
      const productData = (
        await axios.get(`api/sellerProduct/getProduct`, {
          params: {
            product_id: router.query.product_id,
            store_id: userContext.StoreInfo.store_id,
          },
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data[0];
      if (productData.length !== 0) {
        setProductName(productData.product_name);
        setproductDetail(productData.product_detail);
        setProductQuantity(productData.product_quantity);
        setProductPrice(productData.product_price);
        setProductStatus(productData.product_status);
        if (productData.product_img.length) {
          for (let i = 0; i < productData.product_img.length; i++) {
            files_list.push({
              ...productData.product_img[i],
              url: "",
            });
            setProductImage([...files_list]);
          }
        }
      }
    } catch (error) {}
  };

  const updateProduct = async () => {
    setLoadingUpdate({ formButton: true });
    let formData = new FormData();

    formData.append("product_name", productName);
    formData.append("product_detail", productDetail);
    formData.append("product_price", productPrice);
    formData.append("product_quantity", productQuantity);
    formData.append("product_status", productStatus ? 1 : 0);
    formData.append("product_id", router.query.product_id);
    formData.append("store_id", userContext.StoreInfo.store_id);
    for (let i = 0; i < removedImg.length; i++) {
      formData.append("deleted_img[]", JSON.stringify(removedImg[i]));
    }

    try {
      if (productNewImage.length) {
        const dataTransfer = new DataTransfer();
        productNewImage.forEach((img) => {
          if (img.file) {
            dataTransfer.items.add(img.file);
          }
        });

        for (let i = 0; i < dataTransfer.files.length; i++) {
          formData.append("new_img[]", dataTransfer.files[i]);
        }
      }

      const updateProduct = (
        await axios.post(`api/sellerProduct/updateProductById`, formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;

      if (updateProduct.affectedRows) {
        setUpdateSuccess(true);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const HandleShowImage = (e) => {
    if (e.target && e.target.files) {
      var files_length = 0;
      if (productImage.length <= 5) {
        if (e.target.files.length + productImage.length <= 5) {
          files_length = e.target.files.length;
        } else {
          files_length = 5 - productImage.length;
        }

        const list_of_files = [];

        for (let i = 0; i < files_length; i++) {
          list_of_files.push({
            file: e.target.files[i],
            url: URL.createObjectURL(e.target.files[i]),
          });
        }
        setProductNewImage([...productNewImage, ...list_of_files]);
        setProductImage([...productImage, ...list_of_files]);
      }
    }
  };

  const HandleRemoveImage = async (imageInfo, i) => {
    if (imageInfo.url === "") {
      const removedImageData = [];
      removedImageData.push({ ...imageInfo });
      setRemovedImg([...removedImg, ...removedImageData]);
    } else {
      const removedImage = [...productNewImage];
      removedImage.splice(i - productImage.length, 1);
      setProductNewImage(removedImage);
    }
    const list_of_files = [...productImage];
    list_of_files.splice(i, 1);
    setProductImage(list_of_files);
  };

  const HandleFormSubmit = (e) => {
    e.preventDefault();

    if (HandleValidationInput()) {
      updateProduct();
    }
  };

  const HandleValidationInput = () => {
    let formIsValid = true;

    if (productImage.length === 0) {
      setValidationInput({ img: false });
      formIsValid = false;
    } else {
      setValidationInput({ img: true });
    }

    if (productName == "") {
      setValidationInput({ name: false });
      formIsValid = false;
    } else {
      setValidationInput({ name: true });
    }

    if (productDetail === "") {
      setValidationInput({ detail: false });
      formIsValid = false;
    } else {
      setValidationInput({ detail: true });
    }

    if (productPrice === 0) {
      setValidationInput({ price: false });
      formIsValid = false;
    } else {
      setValidationInput({ price: true });
    }

    return formIsValid;
  };
  return (
    <>
      <NotificationManageProductSuccess
        show={updateSuccess}
        text={`Produk berhasil diubah.`}
        goToRouteText={`Pindah ke halaman Atur Produk`}
        goToRoute={`/seller/manage-product`}
      />
      <div className={``}>
        <div className={`text-[25px]`}>Tambah Produk</div>
        <div className={`border rounded-md p-3 border-blue-600`}>
          <div className={`block`}>
            <div>Foto Produk</div>
            <div className={`my-2`}>
              <div className={`w-full h-[10rem] flex`}>
                {productImage.map((img, i) => (
                  <React.Fragment key={i}>
                    <div
                      className={`relative w-[10rem] mr-2 ring-1 ring-gray-500 ring-offset-0 rounded-md`}
                    >
                      <img
                        src={
                          img.url === ""
                            ? config.imageApi +
                              img.product_img_name +
                              `_150` +
                              `.webp`
                            : img.url
                        }
                        className={`object-cover rounded-md w-full h-[10rem]`}
                        alt=""
                      />
                      <div
                        className={`w-[10rem] h-[3rem] group rounded-b-md absolute z-[3] -translate-y-[3rem] opacity-0 hover:opacity-100 hover:transition duration-100 hover:bg-gray-100/80`}
                      >
                        <div
                          className={`w-[9rem] absolute translate-x-2 bottom-1`}
                        >
                          <div className={`flex justify-center`}>
                            <img
                              src="/assets/seller/trash.png"
                              className={`w-[2rem] rounded-md cursor-pointer`}
                              alt=""
                              onClick={() => HandleRemoveImage(img, i)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
                {productImage.length < 5 ? (
                  <>
                    <label htmlFor={`input-photo`}>
                      <div
                        className={`relative w-[10rem] h-[10rem] mr-2 border-2 border-gray-500 hover:border-blue-700 transition border-dashed rounded-md cursor-pointer bg-gray-500/30 hover:bg-blue-600/40`}
                      />
                    </label>

                    <input
                      id={`input-photo`}
                      type="file"
                      onChange={HandleShowImage}
                      hidden
                      multiple
                      onClick={(e) => (e.target.value = "")}
                    />
                  </>
                ) : null}
              </div>
              <div className={`text-red-600`}>
                Min. jumlah foto 1 buah, max 5 buah
              </div>
            </div>
          </div>

          <form onSubmit={HandleFormSubmit} className={`block`}>
            <div>
              <div>Judul Produk</div>
              <input
                type="text"
                className={`w-full h-[2.5rem] p-1 border rounded-md border-blue-600`}
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
              />
              {validationInput.name == false ? (
                <>
                  <div className={`text-red-600`}>
                    Judul produk tidak boleh kosong.
                  </div>
                </>
              ) : null}
            </div>
            <div>
              <div>Detail Produk</div>
              <textarea
                name=""
                className={`border rounded-md w-full p-1 resize-none text-justify border-blue-600 focus:border-blue-600`}
                cols="5"
                rows="15"
                onChange={(e) => setproductDetail(e.target.value)}
                value={productDetail}
              />
              {validationInput.detail == false ? (
                <>
                  <div className={`text-red-600`}>
                    Rincian produk tidak boleh kosong.
                  </div>
                </>
              ) : null}
            </div>
            <div className={`flex`}>
              <div>
                <div>Harga</div>
                <input
                  type="text"
                  className={`w-[15rem] h-[2.5rem] p-1 border rounded-md border-blue-600 webkit-appearance`}
                  onChange={(e) => setProductPrice(e.target.value)}
                  value={productPrice}
                />
                {validationInput.price == false ? (
                  <>
                    <div className={`text-red-600`}>
                      Harga produk tidak boleh 0 (nol).
                    </div>
                  </>
                ) : null}
              </div>
              <div className={`m-1`}></div>
              <div>
                <div>Jumlah Produk</div>
                <input
                  type="text"
                  className={`w-[15rem] h-[2.5rem] p-1 border rounded-md border-blue-600`}
                  onChange={(e) => setProductQuantity(e.target.value)}
                  value={productQuantity}
                />
              </div>
            </div>

            <div className={`flex justify-end`}>
              <div className="flex justify-end">
                <label
                  htmlFor="toggleB"
                  className="flex items-center cursor-pointer"
                >
                  <div className="ml-3 text-gray-700 font-medium mr-2">
                    {productStatus ? "Produk Aktif" : "Produk Tidak Aktif"}
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="toggleB"
                      className="sr-only"
                      onChange={() =>
                        productStatus
                          ? setProductStatus(false)
                          : setProductStatus(true)
                      }
                    />
                    <div className="block bg-gray-300 w-14 h-8 rounded-full" />
                    <div
                      className={`${
                        productStatus ? "bg-blue-600 translate-x-full" : ""
                      } absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition duration-300`}
                    />
                  </div>
                </label>
              </div>

              <div className="m-1"></div>
              <button
                type={`submit`}
                className={`border w-[9rem] rounded-md p-2 border-blue-600 flex mt-auto justify-center
                bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white cursor-pointer`}
              >
                {loadingUpdate.formButton ? (
                  <>
                    <svg
                      role="status"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </>
                ) : (
                  "Simpan"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
