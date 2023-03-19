import { useEffect, useState } from "react";
import { CreateTaskModal } from "../Modals/CreateTaskModal";

export const BoardNameSection = () => {
  const [isOpenTaskModal, setIsOpenTaskModal] = useState(false);

  const closeTaskModal = () => {
    setIsOpenTaskModal(false);
  };

  useEffect(() => {
    console.log(isOpenTaskModal);
  }, [isOpenTaskModal]);
  return (
    <>
      {isOpenTaskModal && (
        <CreateTaskModal
          isOpen={isOpenTaskModal}
          onRequestClose={closeTaskModal}
        />
      )}
      <div className="w-full flex flex-row px-4 md:px-8 items-center">
        <div className="w-full flex flex-row  items-center justify-between">
          <h1 className="text-xl max-w-[200px] md:max-w-[400px] truncate md:text-2xl text-white font-bold leading-7">
            Pranav's Dashboard
          </h1>
          <div className="flex flex-row space-x-5">
            <button
              data-modal-target="defaultModal"
              data-modal-toggle="defaultModal"
              className="hidden md:block text-white text-xs bg-mainPurple hover:bg-mainPurpleHover font-bold px-6 py-4 rounded-3xl"
              onClick={() => setIsOpenTaskModal(!isOpenTaskModal)}
            >
              + Add new task
            </button>

            <button
              data-modal-target="defaultModal"
              data-modal-toggle="defaultModal"
              className="md:hidden text-white bg-mainPurple hover:bg-mainPurpleHover font-bold h-8 w-12 px-1 rounded-3xl"
              onClick={() => setIsOpenTaskModal(!isOpenTaskModal)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
