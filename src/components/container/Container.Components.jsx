const Container = ({ children }) => {
  return (
    <>
      <div
        className={`w-full z-0 mobile-s:p-[6rem_2rem] tablet:p-[6rem_4rem] laptop:p-[6rem_6rem] laptop-l:p-[6rem_10rem]`}
      >
        {children}
      </div>
    </>
  );
};

export default Container;
