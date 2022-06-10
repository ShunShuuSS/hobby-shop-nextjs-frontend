/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CustomNotificationWarningClose = ({ show, text, setCheckSameStore }) => {
  const [modalOpen, setModalOpen] = useState(show);

  useEffect(() => {
    setModalOpen(show);
  }, [show]);

  const router = useRouter();

  const handleCloseModal = () => {
    setCheckSameStore(false);
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen ? (
        <>
          <div
            className={`flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center`}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className={`relative p-4 w-full max-w-md h-full md:h-auto`}>
              <div
                className={`relative bg-white rounded-lg shadow dark:bg-gray-700`}
              >
                <div className="p-6 space-y-6">
                  <p className="text-center text-[20px] leading-relaxed text-gray-500 dark:text-gray-400">
                    {text}
                  </p>
                </div>
                <div className="flex justify-center p-6 space-x-2">
                  <button
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleCloseModal}
                  >
                    Tutup peringatan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default CustomNotificationWarningClose;
