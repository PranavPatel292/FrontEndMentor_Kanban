import React from "react";

export const BannerSection = () => {
  return (
    <>
      <div className="md:w-64 lg:w-80 flex flex-row pl-6 space-x-2 items-center">
        <img src="./darkmodeLogo.png" className="w-6 h-8" />
        <img src="./darkmodeBanner.png" className="w-28 h-8 hidden md:block" />
      </div>
    </>
  );
};
