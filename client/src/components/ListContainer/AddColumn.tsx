import React from "react";

export const AddColumn = () => {
  return (
    <>
      {/* todo: fix height for responsive layout */}
      <div className=" min-w-[280px] h-screen max-h-[550px] bg-gradient-to-b from-[#2B2C37]  to-[#2B2C37] bg-opacity-25 rounded-3xl flex flex-col justify-center items-center">
        <p className="text-2xl font-bold leading-8 text-mediumGrey">
          + New Column
        </p>
      </div>
    </>
  );
};
