import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
    <div
      className={`w-[200px] sm:mr-0 mr-3 lg:w-[30%] ${
        currentCard === cardData?.heading
          ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
          : "bg-richblack-800"
      }  text-richblack-25 h-[300px] box-border cursor-pointer`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div
          className={` ${
            currentCard === cardData?.heading && "text-richblack-800"
          } font-semibold sm:text-[20px] text-[14px]`}
        >
          {cardData?.heading}
        </div>

        <div className="text-richblack-400 sm:text-[16px] text-[14px]">{cardData?.description}</div>
      </div>

      <div
        className={`flex justify-between ${
          currentCard === cardData?.heading ? "text-blue-300" : "text-richblack-300"
        } px-6 py-3 font-medium`}
      >
        <div className="flex items-center gap-2 sm:text-[16px] text-[12px]">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>
        <div className="flex items-center gap-2 sm:text-[16px] text-[12px]">
          <ImTree />
          <p>{cardData?.lessionNumber} Lession</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;