const EditProduct = () => {
  // const FormSubmit = (e) => {
  //   e.preventDefault();
  // };
  return (
    <>
      <div>
        <div className={`text-[25px]`}>Tambah Produk</div>
        <div className={`border rounded-md p-3`}>
          <form action={``} className={`block`}>
            <div>Foto Produk</div>
            <div className={`my-2`}>
              <div className={`flex`}>
                <img
                  src="/test1.jpg"
                  className={`w-[12rem] rounded-md mr-2`}
                  alt=""
                />
                <img
                  src="/test1.jpg"
                  className={`w-[12rem] rounded-md mr-2`}
                  alt=""
                />
                <img
                  src="/test1.jpg"
                  className={`w-[12rem] rounded-md mr-2`}
                  alt=""
                />
                <img
                  src="/test1.jpg"
                  className={`w-[12rem] rounded-md mr-2`}
                  alt=""
                />
                <img
                  src="/test1.jpg"
                  className={`w-[12rem] rounded-md mr-2`}
                  alt=""
                />
              </div>

              <div className={`mt-2`}></div>
              <input type="file" />
            </div>
            <div>
              <div>Judul Produk</div>
              <input
                type="text"
                className={`w-full h-[2.5rem] p-1 border rounded-md border-gray-300`}
              />
            </div>
            <div>
              <div>Detail Produk</div>
              <textarea
                name=""
                className={`border rounded-md w-full p-1 resize-none text-justify`}
                cols="5"
                rows="30"
              ></textarea>
            </div>
            <div className={`flex`}>
              <div>
                <div>Harga</div>
                <input
                  type="text"
                  className={`w-[15rem] h-[2.5rem] p-1 border rounded-md border-gray-300 webkit-appearance`}
                />
              </div>
              <div className={`m-1`}></div>
              <div>
                <div>Jumlah Produk</div>
                <input
                  type="text"
                  className={`w-[15rem] h-[2.5rem] p-1 border rounded-md border-gray-300`}
                />
              </div>
            </div>

            <div className={`flex justify-end`}>
              <div className={`border rounded-md p-2`}>Batal</div>
              <div className="m-1"></div>
              <div className={`border rounded-md p-2`}>Nonaktifkan</div>
              <div className="m-1"></div>
              <button type={`submit`} className={`border rounded-md p-2`}>
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
