import React from "react";

export const BoardNameSection = () => {
  return (
    <>
      <div className="w-full flex flex-row px-8 items-center">
        <div className="w-full flex flex-row  items-center justify-between">
          <h1 className="text-2xl text-white font-bold leading-7">
            Pranav's Dashboard
          </h1>
          <div className="flex flex-row space-x-5">
            <button className="text-white text-xs bg-mainPurple hover:bg-mainPurpleHover font-bold px-6 py-4 rounded-3xl">
              + Add new task
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
