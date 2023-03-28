import React, { useState } from "react";
import { ListsContainer } from "./ListContainer/ListsContainer";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar";
import { BsEye } from "react-icons/bs";

export const Container = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="w-full bg-darkBG ">
        <Header />
        <div
          className={`fixed top-[670px] rounded-r-lg w-[56px] ml-[-10px] text-white z-10 bg-[#635FC7] pl-5 py-3 rounded-lg`}
          onClick={() => setOpen(!open)}
        >
          <BsEye size={20} />
        </div>

        <div>
          <div>
            <Sidebar open={open} />
          </div>
          <div
            className={`absolute w-full h-screen z-[-100]  bg-darkBG transition-all duration-300 ease-in-out ${
              open ? "ml-5 translate-x-60" : "translate-x-0"
            }`}
          >
            <ListsContainer />
          </div>
        </div>
      </div>
    </>
  );
};
