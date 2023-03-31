import { useEffect, useRef, useState } from "react";
import { ListsContainer } from "./ListContainer/ListsContainer";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar";
import { BsEye } from "react-icons/bs";

// TODO: change the max-width dynamically
export const Container = () => {
  const [open, setOpen] = useState(false);

  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [componentRef, open]);

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

        <div className="flex">
          <div ref={componentRef}>
            <Sidebar open={open} />
          </div>
          <div
            className={` overflow-x-scroll  h-screen z-[1]   transition-all duration-300 ease-in-out ${
              open
                ? "ml-5 translate-x-[240px] max-w-[1150px]"
                : "translate-x-0  "
            }`}
          >
            <ListsContainer />
          </div>
        </div>
      </div>
    </>
  );
};
