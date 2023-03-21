import { useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { AddColumn } from "./AddColumn";
import { DroppableColumn } from "./DroppableColumn";
import { indicatorColor } from "./indicatorColor";
import { useMutation, useQuery } from "react-query";
import { getAllColumns, moveWithInTheColumns } from "../../requests/column";

interface WithInColumRequest {
  id: string;
  position: number;
}

export const ListsContainer = () => {
  const [columns, setColumns] = useState(null);
  const { mutate: moveWithInTheColumnMutate } = moveWithInTheColumns();

  const { data, isLoading, error } = useQuery(
    ["allColumnData"],
    getAllColumns,
    {
      staleTime: 1000,
    }
  );

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

      const data: any = [];

      copiedItems.map((item, index) => {
        data.push({ taskId: item.id, position: index });
      });

      moveWithInTheColumnMutate(data, {
        onSuccess: () => {
          setColumns({
            ...columns,
            [source.droppableId]: {
              ...column,
              items: copiedItems,
            },
          });
        },
        onError: (err: any) => {
          // TODO: make a toast error message
        },
      });
    }
  };

  if (data && !columns) {
    setColumns(data.data.data);
  }

  return (
    <>
      {columns && (
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
                      Math.floor(index + 1 / data?.data.data.length)
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
      )}
    </>
  );
};
