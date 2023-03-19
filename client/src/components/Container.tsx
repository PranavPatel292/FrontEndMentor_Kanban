import React, { useState } from "react";
import { ListsContainer } from "./ListContainer/ListsContainer";
import { Header } from "./Header/Header";

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
