const ReceiverInformation = () => {
  return (
    <>
      <div className={`w-full flex justify-between`}>
        <div className={`w-[10rem]`}>
          Pembeli<span className={`float-right`}>:&nbsp;</span>
        </div>
        <div
          className={`w-[20rem] break-words whitespace-normal overflow-hidden webkit-box webkit-box-vertical text-ellipsis`}
        >
          Steven
        </div>
      </div>
      <div className={`w-full flex justify-between`}>
        <div className={`w-[10rem]`}>
          Tanggal Pembelian<span className={`float-right`}>:&nbsp;</span>
        </div>
        <div className={`w-[20rem]`}>Steven</div>
      </div>
      <div className={`w-full flex justify-between`}>
        <div className={`w-[10rem]`}>
          Alamat Pengiriman<span className={`float-right`}>:&nbsp;</span>
        </div>
        <div
          className={`w-[20rem] break-words whitespace-normal overflow-hidden webkit-box webkit-box-vertical text-ellipsis`}
        >
          <span>Steven</span>
          <div className={`text-justify`}>
            Tangcity mall lantai LG A70-A71 Evogad Tangcity mall lantai LG
            A70-A71 EvogadTangcity mall lantai LG A70-A71 Evogad
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiverInformation;
