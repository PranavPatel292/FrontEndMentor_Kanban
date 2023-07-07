import { DraggableItem } from "./DraggableItem";
import { StrictModeDroppable as Droppable } from "./StrictModeDroppable";

interface DroppableColumnProps {
  id: string;
  indicatorColor: string;
  column: any;
  index: number;
}

export const DroppableColumn = ({
  id,
  indicatorColor,
  column,
  index,
}: DroppableColumnProps) => {
  return (
    <div className="flex flex-col space-y-10 h-[80%] min-w-[280px]" key={index}>
      <p className="flex flex-row space-x-3 items-center">
        <span className={`flex w-3 h-3 ${indicatorColor} rounded-full`} />
        <span className="text-xs font-bold leading-4 text-mediumGrey tracking-widest uppercase">
          {column.name} ({column.items.length})
        </span>
      </p>
      <Droppable droppableId={id} key={id}>
        {(provided) => {
          return (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {column.items.map((item: any, index: number) => {
                return <DraggableItem item={item} index={index} key={index} />;
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};
