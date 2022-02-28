const Tabs = ({ children, addClass }) => {
  return (
    <>
      <div
        className={`h-full w-[10rem] flex text-center text-[17px] hover:bg-gray-300 rounded-t-md cursor-pointer ${addClass}`}
      >
        <div className={`m-auto`}>{children}</div>
      </div>
    </>
  );
};

export default Tabs;
