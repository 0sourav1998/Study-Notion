import React from "react";
import RenderStep from "./RenderStep";

const AddCourse = () => {
  return (
    <>
      <div className="flex sm:w-full items-start sm:gap-x-6 gap-x-0 overflow-x-hidden">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-6 sm:text-3xl sm:font-medium text-lg font-normal ml-3 text-richblack-5">
            Add course
          </h1>
          <div className="flex-1">
            <RenderStep />
          </div>
        </div>
        <div
          div
          className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block"
        >
          <p className="mb-8 text-lg text-richblack-5">Code Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
