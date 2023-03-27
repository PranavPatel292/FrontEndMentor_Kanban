import { useEffect, useMemo, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useQuery, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { UpdateBoard } from "../Modals/UpdateBoard";
import { getColumnNames } from "../../requests/column";
import { deleteBoard } from "../../requests/board";
import { showToast } from "../Common/Toast";

export const BoardNameSection = () => {
  const [isOpenTaskModal, setIsOpenTaskModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdateTaskModal, setIsUpdateTaskModal] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = deleteBoard();

  const onRequestClose = () => {
    setIsUpdateTaskModal(false);
  };

  const handleModalOpen = () => {
    setIsMenuOpen(false);
    setIsUpdateTaskModal(true);
  };

  const handleOnClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const customClass = `
  bg-darkGrey
  text-white
  `;

  const { data } = useQuery(["boardNameAndColumnsNames"], getColumnNames, {
    staleTime: Infinity,
  });

  const memoizedBoardNameAnsColumnsData = useMemo(() => {
    return data?.data.data;
  }, [data]);

  useEffect(() => {}, [memoizedBoardNameAnsColumnsData]);

  const showAlert = async (deleteBoard: any) => {
    const result = await Swal.fire({
      title: "Are you sure, you want to delete the board?",
      text: `You are about to delete the ${deleteBoard.boardName}. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        container: customClass,
        popup: customClass,
      },
    });

    if (result.isConfirmed) {
      const data = {
        boardId: deleteBoard.boardId,
      };

      mutate(data, {
        onSuccess: () => {
          showToast.success("Data deleted successfully");
        },
        onError: () => {
          showToast.error("Sorry something went wrong");
        },
        onSettled: () => {
          queryClient.invalidateQueries("allColumnData");
        },
      });
    }
  };

  return (
    <>
      <UpdateBoard
        isOpen={isUpdateTaskModal}
        onRequestClose={onRequestClose}
        item={memoizedBoardNameAnsColumnsData}
      />

      <div className="w-full flex flex-row px-4 md:px-8 items-center">
        <div className="w-full flex flex-row  items-center justify-between">
          <h1 className="text-xl max-w-[200px] md:max-w-[400px] truncate md:text-2xl text-white font-bold leading-7">
            Pranav's Dashboard
          </h1>
          <div className="flex flex-row space-x-3">
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

            <div onClick={handleOnClick}>
              <BiDotsVerticalRounded color="#828FA3" size={40} />
            </div>
            <div
              className={`mt-14 absolute z-[10]  ${
                isMenuOpen ? "block" : "opacity-0"
              } `}
            >
              <div className="flex flex-col space-y-5 w-[206px] rounded-[10px] p-5 bg-darkBG ">
                <p
                  className="text-mediumGrey text-sm font-semibold leading-[23px] hover:underline"
                  onClick={handleModalOpen}
                >
                  Edit Board
                </p>
                <p
                  className="text-red text-sm font-semibold leading-[23px] hover:underline"
                  onClick={() => showAlert(memoizedBoardNameAnsColumnsData)}
                >
                  Delete Board
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
