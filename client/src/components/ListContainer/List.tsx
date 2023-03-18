import React from "react";
// each list will have its own indicator
// and data

interface ListProps {
  indicatorColor: string;
  list: any;
}
export const List = ({ indicatorColor, list }: ListProps) => {
  return (
    <>
      <div className="flex flex-col space-y-10 min-w-[280px]">
        <p className="flex flex-row space-x-3 items-center">
          <span className={`flex w-3 h-3 ${indicatorColor} rounded-full`} />
          <span className="text-xs font-bold leading-4 text-mediumGrey tracking-widest uppercase">
            {list.title} ({list.items.length})
          </span>
        </p>
        <ul className="flex flex-col">
          {list.items.map((item: any, index: number) => {
            return (
              <li className="w-full bg-darkGrey rounded-lg mb-5" key={index}>
                <div className="flex flex-col space-y-1 pt-5 pb-5 pr-4 pl-4">
                  <p className="min-w-[248px] text-white font-bold text-[15px] leading-4 truncate">
                    {item.title}
                  </p>
                  <p className="text-mediumGrey leading-4 font-bold text-xs">
                    0 of 3 subtasks done
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
