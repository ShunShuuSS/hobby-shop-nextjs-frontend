import Router from "next/router";

const LoginNotification = () => {
  const GoToLoginPage = () => {
    Router.push(`/login`);
  };
  return (
    <>
      <div
        className={`fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[25rem] h-[15rem] border rounded-3xl p-[15px]`}
      >
        <div className={`block relative`}>
          <div className={`font-bold text-[25px] text-center`}>
            Login Terlebih Dahulu
          </div>
          <div className={``}>
            <div
              className={`border rounded-md w-[15rem] h-[2.5rem] mx-auto bottom-0`}
            >
              <div className={`text-center`}>Menuju Halaman Login</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginNotification;
