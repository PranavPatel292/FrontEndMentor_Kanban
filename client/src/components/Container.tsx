import React from "react";
import { ListsContainer } from "./ListContainer/ListsContainer";

// client/tailwind.config.cjs

export const Container = () => {
  return (
    <>
      <div className="w-full h-screen bg-darkBG absolute">
        <ListsContainer />
      </div>
    </>
  );
};
