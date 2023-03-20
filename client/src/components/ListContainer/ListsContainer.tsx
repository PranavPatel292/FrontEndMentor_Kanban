import { useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { AddColumn } from "./AddColumn";
import { DroppableColumn } from "./DroppableColumn";
import { indicatorColor } from "./indicatorColor";

const FAKE_DATA = {
  "182ddf58-3864-4a1a-a9a4-31adf9434a53": {
    name: "To do",
    items: [
      {
        columnId: "182ddf58-3864-4a1a-a9a4-31adf9434a53",
        title: "Task 1",
        description: "This task needs to be completed",
        subTasks: [
          { title: "Make coffee", status: "in-completed" },
          { title: "Make coffee", status: "in-completed" },
        ],
        id: "ee4dd958-4a63-4dfc-8008-b2d1b75ed822",
      },
      {
        columnId: "182ddf58-3864-4a1a-a9a4-31adf9434a53",
        title: "Task 2",
        description: "Pranav needs to complete this",
        subTasks: [
          { title: "Make presentation", status: "in-completed" },
          { title: "Make coffee", status: "completed" },
        ],
        id: "1eed9f66-6613-410e-9c9f-9c329f88fecf",
      },
    ],
  },
  "f9d52b53-6cfd-4465-902c-c6c889ff8a46": {
    name: "In Progress",
    items: [
      {
        columnId: "f9d52b53-6cfd-4465-902c-c6c889ff8a46",
        title: "Task 3",
        description: "Someone needs to be completed",
        subTasks: [
          { title: "Make presentation", status: "in-completed" },
          { title: "Make coffee", status: "in-completed" },
        ],
        id: "20824c9c-6c11-4ceb-ab25-6fb16e02956a",
      },
    ],
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
