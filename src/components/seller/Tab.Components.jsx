const Tab = ({ children, addClass }) => {
  return (
    <>
      <div
        className={`w-full h-[2.5rem] hover:bg-slate-300 rounded-sm flex ${addClass}`}
      >
        <div className={`w-full my-auto mx-2`}>{children}</div>
      </div>
    </>
  );
};

export default Tab;
