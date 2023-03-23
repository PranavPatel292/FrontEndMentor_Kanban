import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useLongPress } from "use-long-press";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";
import type { SweetAlertOptions } from "sweetalert2";
import { deleteTask } from "../../requests/task";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { ShowItemModal } from "../Modals/ShowItemModal";

interface DraggableItemProps {
  index: number;
  item: any;
}
export const DraggableItem = ({ index, item }: DraggableItemProps) => {
  const [isLongPress, setIsLongPress] = useState(false);
  const queryClient = useQueryClient();
  const completedSubTasks = item.subTask?.filter((subtask: any) => {
    return subtask.status === "COMPLETE";
  });

  const [showItemModalOpen, setShowItemModalOpen] = useState(false);

  const customClass = `
  bg-darkGrey
  text-white
`;

  const { mutate } = deleteTask();

  const showAlert = async (data: any) => {
    const result = await Swal.fire({
      title: "Are you sure, you want to delete the selected task?",
      text: "You are about to delete this item. This action cannot be undone.",
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
      mutate(data, {
        onSuccess: () => {
          toast.success("Data inserted successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        },
        onError: () => {
          toast.error("Sorry something went wrong", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        },
        onSettled: () => {
          queryClient.invalidateQueries("allColumnData");
        },
      });
    }
    setIsLongPress(false);
  };

  const onRequestClose = () => {
    setShowItemModalOpen(false);
  };
  const handleOnClick = () => {
    if (!isLongPress) setShowItemModalOpen(true);
  };

  const bind = useLongPress(() => {}, {
    onFinish: (event, meta: any) => {
      setIsLongPress(true);
      showAlert(meta.context);
      //console.log("delete this item", meta.context, isLongPressActive);
    },
    onCancel: () => {
      console.log("onCancel");
    },
    filterEvents: (event) => true, // All events can potentially trigger long press
    threshold: 300,
    captureEvent: true,
    cancelOnMovement: false,
  });

  return (
    <>
      {showItemModalOpen && (
        <ShowItemModal
          items={item}
          isOpen={showItemModalOpen}
          onRequestClose={onRequestClose}
        />
      )}
      <Draggable draggableId={item.id} key={item.id} index={index}>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              {...bind({ taskId: item.id, columnId: item.columnId })}
              onClick={handleOnClick}
            >
              <li
                className={`w-full bg-darkGrey
                 rounded-lg mb-5 list-none p-5 `}
                key={index}
              >
                <div className="flex flex-col space-y-1">
                  <p className="min-w-[248px] max-w-[248px] text-white font-bold text-[15px] leading-4 truncate">
                    {item.title}
                  </p>
                  <p className="text-mediumGrey leading-4 font-bold text-xs">
                    {`${completedSubTasks.length} of ${item.subTask.length} subtasks done`}
                  </p>
                </div>
              </li>
            </div>
          );
        }}
      </Draggable>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
