import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Td, Thead, Tr, Th, Tbody } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { COURSE_STATUS } from "../../../../utils/constants";
import IconBtn from "../../../common/IconButton";
import ConfirmationModal from '../../../common/ConfirmationModal'
import {deleteCourse , fetchInstructorCourses} from '../../../../services/operations/courseDetailsAPI'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {FiEdit2} from 'react-icons/fi'

const CoursesTable = ({ courses, setCourses }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  return (
    <div>
      <Table className="rounded-xl border border-richblack-800 ">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="flex-1 text-left sm:text-sm text-xs font-medium uppercase"><p className="text-richblack-100">Courses</p></Th>
            <Th className="text-left sm:text-sm text-xs font-medium uppercase text-richblack-100">Duration</Th>
            <Th className="text-left sm:text-sm text-xs font-medium uppercase text-richblack-100">Price</Th>
            <Th className="text-left sm:text-sm text-xs font-medium uppercase text-richblack-100">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
            {courses.length > 0 && courses?.map((course)=>(
                <Tr key={course._id}
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8">
                <Td className="flex flex-1 gap-x-4 sm:text-normal text-xs">
                    <img src={course.thumbnail} alt="Course-Thumbnail"  className="lg:h-[148px] lg:w-[220px] h-[60px] w-[80px] mb-1 rounded-lg object-cover "/>
                    <div className="flex flex-col justify-between gap-2 ">
                    <p className="sm:text-lg text-xs sm:font-semibold font-normal text-richblack-5">{course.courseName}</p>
    
                    <p className="text-xs text-richblack-300">{course.courseDescription}</p>
    
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 sm:px-2 py-[2px]  px-2 sm:text-[12px] text-[9px] font-medium text-pink-100">Drafted</p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 sm:px-2 py-[2px] px-2 sm:text-[12px] text-[9px] font-medium text-yellow-100">Published</p>
                    )}
                  </div>
                </Td>
                <Td className="sm:text-sm text-[10px] font-medium text-richblack-100">
                    2hr 30min
                </Td>
                <Td className="sm:text-sm text-xs font-medium text-richblack-100">
                    <p className="sm:text-sm text-[10px] font-medium text-richblack-100">{course.price}</p>
                </Td>
                <Td className="sm:text-sm text-xs font-medium text-richblack-100 ">
                    <button title="Edit" onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)} className="sm:px-2 px-1 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300">
                     <FiEdit2 size={20} />
                    </button>
                    <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handle: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handle: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CoursesTable;
