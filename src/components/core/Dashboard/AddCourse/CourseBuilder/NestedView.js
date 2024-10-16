import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillCaretDown } from "react-icons/ai";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { FaPlus } from "react-icons/fa";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [addSubSection, setAddSubsection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleleSection = async (sectionId) => {
    const result = await deleteSection(
      { sectionId, courseId: course._id },
      token
    );
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handleDeleleSubSection = async (sectionId, subSectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token });
    if (result) {
      const updatedCourseContent = course.courseContent?.map((section) =>
        section._id === sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  };
  return (
    <>
      <div
        className="rounded-lg bg-richblack-700 sm:p-6 p-2 sm:px-8 px-4 lg:mr-0 mr-6 sm:w-full w-full"
        id="nestedViewContainer"
      >
        {course?.courseContent?.map((section, index) => (
          <details key={index} className="text-white">
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="sm:text-2xl text-lg text-richblack-50" />
                <p className="lg:font-semibold font-semibol text-xs text-richblack-50">
                  {section.sectionName}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handle: () => handleDeleleSection(section._id),
                      btn2handle: () => setConfirmationModal(null),
                    });
                  }}
                >
                  <RiDeleteBin6Line className="sm:text-xl text-lg text-richblack-300" />
                </button>
                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className={`sm:text-xl text-lg text-richblack-300`} />
              </div>
            </summary>
            <div className="sm:mx-6 mx-3 pb-2">
              {section?.subSection?.map((data) => (
                <div
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                  <div className="flex items-center gap-x-3 py-2 ">
                    <RxDropdownMenu className="sm:text-2xl text-lg text-richblack-50" />
                    <p className="font-semibold text-xs text-richblack-50">
                      {data.title}
                    </p>
                  </div>
                  <div onClick={(e)=>e.stopPropagation()}>
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit className="sm:text-xl text-sm text-richblack-300" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "Selected Video will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handle: () =>
                            handleDeleleSubSection(section._id, data._id),
                          btn2handle: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setAddSubsection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50"
              >
                <FaPlus className="sm:text-lg text-xs" />
                <p className="sm:text-normal text-xs">Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <div></div>
      )}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <></>
      )}
    </>
  );
};

export default NestedView;
