import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getInstructorStats } from "../../../../services/operations/profileAPI";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";

const Instructor = () => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [instructorStats, setInstructorStats] = useState(null);
  const {user} = useSelector((state)=>state.profile)
  useEffect(() => {
    const instructorStats = async () => {
      setLoading(true);
      const instructorStats = await getInstructorStats(token);
      const courseDetails = await fetchInstructorCourses(token);
      if (instructorStats.length) setInstructorStats(instructorStats);
      if (courseDetails) {
        setCourses(courseDetails);
      }
      setLoading(false);
    };
    instructorStats();
  }, []);
  const totalAmount = instructorStats?.reduce((acc,curr)=>acc+curr.totalAmoutGenerated,0) ;
  const totalStudents = instructorStats?.reduce((acc,curr)=>acc+curr.totalEnrolledStudents,0) ;
  return (
    <div>
      <div className="space-y-2 overflow-x-hidden">
        <h1 className="sm:text-2xl text-lg font-bold text-richblack-5">
          Hi {user?.firstName} 👋
        </h1>
        <p className="sm:font-medium sm:text-sm text-xs text-richblack-200">
          Let's start something new
        </p>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : courses.length > 0 ? (
        <div>
          <div className="my-4 flex sm:flex-row flex-col h-[450px] sm:space-x-4 space-x-0">
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorStats} />
            ) : (
              <div className="flex-1 rounded-md bg-richblack-800 p-6">
                <p className="sm:text-lg text-sm sm:font-bold font-semibold text-richblack-5">Visualize</p>
                <p className="mt-4 sm:text-xl sm:font-medium text-lg font-normal text-richblack-50">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}
            <div className="flex sm:min-w-[250px] w-[100%] mt-4 mb-4 flex-col rounded-md bg-richblack-800 sm:p-6 p-2 sm:mr-0 mr-50px">
              <p className="sm:text-lg sm:font-bold text-sm text-richblack-5">Statistics</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="sm:text-lg text-sm text-richblack-200">Total Courses</p>
                  <p className="sm:text-3xl text-xl font-semibold text-richblack-50">
                    {courses.length}
                  </p>
                </div>
                <div>
                  <p className="sm:text-lg text-sm text-richblack-200">Total Students</p>
                  <p className="sm:text-3xl text-xl font-semibold text-richblack-50">
                    {totalStudents}
                  </p>
                </div>
                <div>
                  <p className="sm:text-lg text-sm text-richblack-200">Total Income</p>
                  <p className="sm:text-3xl text-xl font-semibold text-richblack-50">
                    Rs. {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-md bg-richblack-800 sm:p-6 p-2 sm:mt-0 mt-[230px]">
            <div className="flex flex-row items-center justify-between">
              <p className="sm:text-lg text-sm font-bold text-richblack-5">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="sm:text-xs text-[8px] font-semibold text-yellow-50">View All</p>
              </Link>
            </div>
            <div className="my-4 flex sm:flex-row flex-col gap-y-3 sm:items-start items-center">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="sm:w-1/3 w-full">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="sm:h-[201px] sm:w-full h-[100px] w-[98%] rounded-md object-cover"
                  />
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-richblack-50">
                      {course.courseName}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-xs font-medium text-richblack-300">
                        {course.studentsEnrolled?.length === 0 ? 0 : course.studentsEnrolled?.length} students
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        |
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        Rs. {course.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
          <p className="text-center text-2xl font-bold text-richblack-5">
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
              Create a course
            </p>
          </Link>
        </div>
      )}
    </div>
  )
};

export default Instructor;
