import React from "react";

const IconBtn = ({ text, onclick, disabled, children, outline = false , type }) => {
  return (
    <button disabled={disabled} onClick={onclick} type={type} className="bg-yellow-300 sm:py-2 sm:px-5 py-2 px-4 sm:rounded-lg rounded-md sm:text-lg text-[12px] font-semibold text-richblack-5">
      { text }
    </button>
  );
};

export default IconBtn;
