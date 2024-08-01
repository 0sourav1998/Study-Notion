import React from "react";

const IconBtn = ({ text, onclick, disabled, children, outline = false , type }) => {
  return (
    <button disabled={disabled} onClick={onclick} type={type} className="bg-yellow-300 py-2 px-5 rounded-lg text-lg font-semibold text-richblack-5">
      { text }
    </button>
  );
};

export default IconBtn;
