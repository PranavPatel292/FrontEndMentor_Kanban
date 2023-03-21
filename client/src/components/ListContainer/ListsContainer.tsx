import { useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { AddColumn } from "./AddColumn";
import { DroppableColumn } from "./DroppableColumn";
import { indicatorColor } from "./indicatorColor";

const FAKE_DATA = {
  "2f23acf4-7ca6-4ac5-8e89-daf2ee7ed976": {
    name: "ToDo",
    items: [
      {
        id: "00c4f3a3-42e7-42c4-b330-130b6dacfae9",
        columnId: "2f23acf4-7ca6-4ac5-8e89-daf2ee7ed976",
        title: "Build UI for onboarding flow",
        description: "This is my first task created using the api and postman",
        position: 1,
        subTask: [
          {
            id: "426a12f7-ab66-4713-ae91-d2606e30c32e",
            status: "INCOMPLETE",
            title: "Make coffee",
            taskId: "00c4f3a3-42e7-42c4-b330-130b6dacfae9",
            position: 1,
          },
          {
            id: "5c92fcf5-93b1-4fd0-9ceb-569d39f57ccf",
            status: "INCOMPLETE",
            title: "Make presentation",
            taskId: "00c4f3a3-42e7-42c4-b330-130b6dacfae9",
            position: 2,
          },
        ],
      },
    ],
  },
  "8e36b133-0b8f-41fc-b9fb-a501dcff00ed": {
    name: "In progress",
    items: [],
  },
  "779661e6-06fe-4ed1-9f8f-717f699df1cb": {
    name: "Done",
    items: [],
  },
};

const onDragEnd = (
  result: any,
  columns: any,
  setColumns: any,
  provided: any
) => {
  const thresholds = 50;

  const { source, destination } = result;

  if (!result.destination) return;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [remove] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, remove);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

export const ListsContainer = () => {
  const [columns, setColumns] = useState(FAKE_DATA);

  return (
    <>
      <div className="flex flex-row space-x-10 mt-20 ml-4 md:mt-28 md:ml-6 lg:mt-32 overflow-y-scroll">
        <DragDropContext
          onDragEnd={(result, provided) =>
            onDragEnd(result, columns, setColumns, provided)
          }
        >
          {Object.entries(columns).map(([id, column], index) => {
            return (
              <DroppableColumn
                id={id}
                indicatorColor={
                  indicatorColor[
                    Math.floor(index + 1 / Object.keys(FAKE_DATA).length)
                  ]
                }
                index={index}
                column={column}
                key={index}
              />
            );
          })}
        </DragDropContext>
        <AddColumn />
      </div>
    </>
  );
};
