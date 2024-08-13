import React from 'react'

import CourseCard from './CourseCard'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules'


const CourseSlider = ({courses}) => {
  return (
    <div>
      {
        courses?.length > 0 ? 
        (<Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem]">
          {
            courses?.map((course,index)=>(
              <SwiperSlide key={index}>
                <CourseCard course={course} height={"h-[250px]"} key={index}/>
              </SwiperSlide>
            ))
          }
        </Swiper>) 
        : 
        (<p>No Courses Found</p>) 
      }
    </div>
  )
}

export default CourseSlider
