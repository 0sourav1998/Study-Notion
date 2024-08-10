import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import VideoDetailsSidebar from '../components/core/Dashboard/ViewCourse/VideoDetailsSidebar';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';

const ViewCourse = () => {
    const {user} = useSelector((state)=>state.profile) ;
    const {token} = useSelector((state)=>state.auth) ;
    const dispatch = useDispatch();
    const [reviewModal,setReviewModal] = useState(null) ;
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
   <>
   <div>
      <VideoDetailsSidebar setReviewModal={setReviewModal}/>
   </div>
   <div>
     <Outlet/>
   </div>
   {/* {
    reviewModal && <ReviewConfirmationModal modalData={reviewModal}/>
   } */}
   </>
  )
}

export default ViewCourse
