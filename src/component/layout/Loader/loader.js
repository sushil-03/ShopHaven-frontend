import React from "react";

const Loader = () => {
  return (
    <div className="w-screen h-screen bg-white grid place-items-center">
      <div className="w-[10vmax]  h-[10vmax] mb-20 border-b-4 rounded-full border-[rgb(0,0,0,0.719)] rotation"></div>
    </div>
  );
};

export default Loader;
