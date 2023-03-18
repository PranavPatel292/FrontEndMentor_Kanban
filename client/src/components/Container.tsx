import React from "react";
import { ListsContainer } from "./ListContainer/ListsContainer";
import { Header } from "./Header/Header";

// client/tailwind.config.cjs

export const Container = () => {
  return (
    <>
      <div className="w-full h-screen bg-darkBG absolute">
        <Header />
        <ListsContainer />
      </div>
    </>
  );
};
