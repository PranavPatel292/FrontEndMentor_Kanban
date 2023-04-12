import { useEffect, useRef, useState } from "react";
import { ListsContainer } from "./ListContainer/ListsContainer";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar";
import { BsEye } from "react-icons/bs";
import { BooleanParam, StringParam, useQueryParam } from "use-query-params";

import { CreateTask } from "./Modals/CreateTask";

// TODO: change the max-width dynamically
export const Container = () => {
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useQueryParam("EditBoard", BooleanParam);
  const [taskId, setTaskId] = useQueryParam("taskId", StringParam);
  const componentRef = useRef<HTMLDivElement>(null);
  const [updateTaskModalOpen, setUpdateTaskModalOpen] = useState(false);

  const handleUpdateTaskModalClose = () => {
    setEditTask(undefined);
    setUpdateTaskModalOpen(false);
    setTaskId(undefined);
  };

  useEffect(() => {
    if (editTask) setUpdateTaskModalOpen(true);
  }, [editTask]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [componentRef, open]);

  return (
    <>
      <div className="w-full bg-darkBG ">
        <CreateTask
          isOpen={updateTaskModalOpen}
          onRequestClose={handleUpdateTaskModalClose}
        />
        <Header />
        <div
          className={`fixed bottom-[30px] rounded-r-lg w-[56px] ml-[-10px] text-white z-10 bg-[#635FC7] pl-5 py-3 rounded-lg`}
          onClick={() => setOpen(!open)}
        >
          <BsEye size={20} />
        </div>

        <div className="flex">
          <div ref={componentRef}>
            <Sidebar open={open} />
          </div>
          <div
            className={` overflow-x-scroll  h-screen z-[1]   transition-all duration-300 ease-in-out ${
              open
                ? "ml-5 translate-x-[240px] max-w-[1150px]"
                : "translate-x-0  "
            }`}
          >
            <ListsContainer />
          </div>
        </div>
      </div>
    </>
  );
};
