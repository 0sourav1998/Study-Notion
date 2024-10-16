import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilder from "./CourseBuilder/CourseBuilder";
import PublishForm from './PublishForm/PublishForm'

const RenderStep = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  return (
    <div className="flex flex-col justify-center">
      <div className="relative mb-2  flex lg:flex-row flex-col gap-2 w-[90%] justify-between">
        {steps?.map((item) => (
          <div className="flex flex-row lg:flex-col items-center " key={item.id}>
            <button
              className={`grid cursor-default aspect-square sm:w-[34px] w-[20px] sm:ml-12 ml-2 place-items-center rounded-full border-[1px] ${
                step === item.id
                  ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                  : "border-richblack-700 bg-richblack-800 text-black"
              } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
            >
              {step > item.id ? (
                <FaCheck className="font-bold text-richblack-900" />
              ) : (
                item.id
              )}
            </button>
          </div>
        ))}
      </div>
      <div className="relative sm:mb-16 mb-8 sm:-mt-[122px] -mt-[100px] lg:mt-0 flex lg:flex-row flex-col w-full select-none justify-between">
        {steps?.map((item,index) => (
          <div key={index}>
            <div className="flex min-w-[130px] flex-col items-center"
              key={item.id}>
              <p className={`sm:text-sm text-[10px] sm:ml-0 ml-2 ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                } sm:mb-6 mb-5`}>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilder/>}
      {step === 3 && <PublishForm/>}
    </div>
  );
};

export default RenderStep;
