import React from "react";

const TextField = ({ ...props }) => {
    return (
        <input
            {...props}
            className="md:text-base text-sm w-full h-full border md:pl-16 pl-12 font-roboto p-2  rounded-md  focus:outline-none focus:border-[#7960dc] focus:ring-1 focus:ring-[#7960dc]
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
        />
    );
};

export default TextField;
