import React, { useState , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RenderStep from '../AddCourse/RenderStep'
import {getFullDetailsOfCourse} from '../../../../services/operations/courseDetailsAPI'
import { setCourse , setEditCourse } from '../../../../slices/courseSlice'
import { useParams } from 'react-router-dom'

const EditCourse = () => {
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const {token} = useSelector(state=>state.auth)
    const {course} = useSelector(state=>state.course)
    const {courseId} = useParams()
    useEffect(() => {
        ;(async () => {
          setLoading(true)
          const result = await getFullDetailsOfCourse(courseId, token)
          if (result?.courseDetails) {
            dispatch(setEditCourse(true))
            dispatch(setCourse(result?.courseDetails))
          }
          setLoading(false)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    
  return (
    <div className='text-white'>
      {
        course  ? (<RenderStep/>) : (<p>No Courses Found</p>)
      }
    </div>
  )
}

export default EditCourse
