import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import VideoDetailsSidebar from '../components/core/Dashboard/ViewCourse/VideoDetailsSidebar';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import ReviewConfirmationModal from '../components/core/Dashboard/ViewCourse/ReviewConfirmationModal';

const ViewCourse = () => {
    const {user} = useSelector((state)=>state.profile) ;
    const {token} = useSelector((state)=>state.auth) ;
    const dispatch = useDispatch();
    const [reviewModal,setReviewModal] = useState(false) ;
    console.log("Review Modal............",reviewModal)
    const {courseId} = useParams();
    console.log("Course Id.........",courseId)

    const fetchCourseFullDetails = async()=>{
      const response = await getFullDetailsOfCourse(courseId,token) ;
      console.log("Response of Course full details............",response) ;
      dispatch(setCourseSectionData(response?.courseDetails?.courseContent)) ;
      dispatch(setEntireCourseData(response?.courseDetails)) ;
      dispatch(setCompletedLectures(response?.completedVideos)) ;
      let lectures = 0 ;
      response?.courseDetails?.courseContent?.map((section)=>(
        lectures += section?.subSection?.length
      )) ;
      dispatch(setTotalNoOfLectures(lectures))
    }
    useEffect(()=>{
      fetchCourseFullDetails()
    },[])
  return (
   <div className="flex">
   <div>
      <VideoDetailsSidebar setReviewModal={setReviewModal}/>
   </div>
   <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
   <div className='mt-6'>
     <Outlet/>
   </div>
   </div>
   {
    reviewModal && <ReviewConfirmationModal setReviewModal={setReviewModal}/>
   }
   </div>
  )
}

export default ViewCourse
