import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useQueryClient } from "react-query";
import { updateSubTaskStatus } from "../../requests/subtask";
import { showToast } from "../Common/Toast";
import { Modal } from "./Modal";

interface ShowItemModalProps {
  items: any;
  isOpen: boolean;
  onRequestClose: () => void;
}

export const ShowItem = ({
  items,
  isOpen,
  onRequestClose,
}: ShowItemModalProps) => {
  // TODO: use enum
  const completedSubTasks = items.subTask?.filter((subtask: any) => {
    return subtask.status === "COMPLETE";
  });

  const { mutate } = updateSubTaskStatus();
  const queryClient = useQueryClient();

  const className =
    "absolute top-1/2  left-1/2 transform -translate-x-1/2  -translate-y-1/2 bg-darkBG rounded-lg p-8 h-[343px] w-[659px] md:min-h-[400px] md:min-w-[480px]";
  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    taskId: string
  ) => {
    // TODO: use enums
    const data = {
      taskId: taskId,
      status: event.target.checked ? "COMPLETE" : "INCOMPLETE",
    };

    mutate(data, {
      onError: () => {
        showToast.error("Something went wrong");
      },
      onSettled: () => {
        queryClient.invalidateQueries("allColumnData");
      },
    });
  };

  return (
    <Modal
      className={className}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      children={
        <div className="flex flex-col space-y-10 min-w-[416px] ">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl font-bold text-white tracking-wider leading-[24px] p-0 m-0 max-w-[387px] ">
              {items.title}
            </h1>
            <BiDotsVerticalRounded color="#828FA3" size={40} />
          </div>
          <p className="text-[13px] font-medium text-mediumGrey leading-[23px]">
            {items.description}
          </p>
          <div>
            <p className="text-white leading-[15.12px] text-sm font-bold mb-5">
              {`Subtasks (${completedSubTasks.length} of ${items.subTask.length})`}
            </p>
            <div className="h-28 overflow-y-scroll">
              {items.subTask.map((task: any, index: number) => {
                return (
                  <div
                    className="w-full bg-darkGrey p-2 rounded-lg mb-2 h-10 flex flex-row space-x-10 justify-left items-center"
                    key={index}
                  >
                    <input
                      type="checkbox"
                      checked={task.status === "COMPLETE"}
                      className={
                        " appearance-none checked:bg-mainPurple p-2 text-white"
                      }
                      onChange={(event) => handleOnChange(event, task.id)}
                    />
                    <p
                      className={` ${
                        task.status === "COMPLETE"
                          ? "line-through text-mediumGrey"
                          : "text-white"
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      }
    />
  );
};
