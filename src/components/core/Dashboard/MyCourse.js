import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteAllCourses, fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconButton"
import CoursesTable from "./InstructorCourses/CoursesTable"
import ConfirmationModal from "../../common/ConfirmationModal"
import { setCourse } from "../../../slices/courseSlice"


export default function MyCourse() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([]) ;
  const [confirmationModal,setConfirmationModal] = useState(null) ;
  const dispatch = useDispatch() ;

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
  }, [])

  const deleteAll =async()=>{
    const response = await deleteAllCourses(token) ;
    setCourses(response);
    setConfirmationModal(null)
  }

  return (
    <div>
      <div className="lg:mb-14 mb-6 flex lg:flex-row flex-col items-center justify-between gap-4">
        <h1 className="lg:text-3xl text-2xl lg:mb-4 mb-1 font-medium text-richblack-5">My Courses</h1>
        <div className="-mt-4 lg:-mt-0">
        {
          courses.length > 0 && <button className="bg-pink-700 rounded-md lg:p-2 p-1 text-white px-4 hover:scale-90 transition-all duration-200 mr-4" onClick={()=>setConfirmationModal({
            text1 : "Delete All Courses" ,
            text2 : "Courses , Sections and Lectures will be deleted" ,
            btn1Text : "Delete All" ,
            btn2Text : "Cancel" ,
            btn1Handle : deleteAll ,
            btn2Handle : ()=>setConfirmationModal(null)
          })}>Delete All</button>
        }
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}

        >
          <VscAdd />
        </IconBtn>
        </div>
        
      </div>
      {courses?.length > 0 ? <CoursesTable courses={courses} setCourses={setCourses} /> : <div className="text-white text-3xl flex justify-center items-center"><p>No Courses Found</p></div>}
      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal} />
      }
    </div>
  )
}