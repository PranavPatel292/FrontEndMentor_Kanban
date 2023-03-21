import { Draggable } from "react-beautiful-dnd";

interface DraggableItemProps {
  index: number;
  item: any;
}
export const DraggableItem = ({ index, item }: DraggableItemProps) => {
  const completedSubTasks = item.subTask?.filter((subtask: any) => {
    return subtask.status === "completed";
  });

  return (
    <>
      <Draggable draggableId={item.id} key={item.id} index={index}>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              <li
                className="w-full bg-darkGrey rounded-lg mb-5 list-none p-5 "
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
    </>
  );
};
