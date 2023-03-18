import React from "react";
import { AddColumn } from "./AddColumn";
import { indicatorColor } from "./indicatorColor";
import { List } from "./List";

const FAKE_DATA = [
  {
    title: "TODO",
    items: [
      { title: "Task 1", description: "This task needs to be completed" },
      { title: "Task 2", description: "Pranav needs to complete this" },
      { title: "Task 3", description: "Someone needs to be completed" },
    ],
  },

  {
    title: "INPROGRESS",
    items: [
      { title: "Task 4", description: "This task needs to be completed" },
      { title: "Task 5", description: "Pranav needs to complete this" },
      { title: "Task 6", description: "Someone needs to be completed" },
      { title: "Task 7", description: "Why this is pending" },
      { title: "Task 8", description: "Find the advantages of React" },
    ],
  },

  {
    title: "done",
    items: [
      { title: "Task 9", description: "This task needs to be completed" },
      { title: "Task 10", description: "Pranav needs to complete this" },
      { title: "Task 11", description: "Someone needs to be completed" },
      { title: "Task 12", description: "Why this is pending" },
      { title: "Task 13", description: "Find the advantages of React" },
    ],
  },
];

export const ListsContainer = () => {
  return (
    <>
      <div className="flex flex-row space-x-10 mt-20 ml-4 md:mt-28 md:ml-6 lg:mt-32 overflow-y-scroll">
        {FAKE_DATA.map((item, index) => {
          return (
            <List
              key={index}
              indicatorColor={
                indicatorColor[Math.floor(index + 1 / FAKE_DATA.length)]
              }
              list={item}
            />
          );
        })}

        <AddColumn />
      </div>
    </>
  );
};
