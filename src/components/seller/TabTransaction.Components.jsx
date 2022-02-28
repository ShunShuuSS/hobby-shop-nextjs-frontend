const TabTransaction = ({ children, addClass }) => {
  return (
    <>
      <div
        className={`w-[10rem] h-[2.5rem] hover:bg-slate-300 rounded-sm flex ${addClass}`}
      >
        <div className={`flex m-auto`}>{children}</div>
      </div>
    </>
  );
};

export default TabTransaction;
