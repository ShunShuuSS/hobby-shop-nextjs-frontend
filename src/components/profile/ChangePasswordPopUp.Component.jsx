const ChangePasswordPopUp = () => {
  const form = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className={``}>
        <form onSubmit={form}>
          <div className={`flex w-full`}>
            <div className={`w-[25rem] block border rounded-xl p-[1rem_5rem]`}>
              <div className={`text-center`}>Ubah Password</div>

              <input
                type="password"
                className={`w-full border rounded-md p-2 mt-5`}
              />
              <button type="submit" className={`w-full border mt-5 p-2`}>
                Konfirmasi
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePasswordPopUp;
