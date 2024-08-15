import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from "./Button"
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-16 sm:mr-0 mr-4'>
      <div className='flex lg:flex-row lg:gap-20 flex-col gap-6 items-center'>

        <div className='lg:w-[50%] w-[90%]'>
            <img
                src={Instructor}
                alt=""
                className='shadow-white'
            />
        </div>

        <div className='lg:w-[50%] w-full ml-8 lg:ml-0 flex flex-col gap-10'>
            <div className='lg:text-4xl text-xl font-semobold lg:w-[50%] w-full'>
                Become an
                <HighlightText text={"Instructor"} />
            </div>

            <p className='font-medium sm:text-[16px] text-[12px] w-[80%] text-richblack-300'>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>

            <div className='w-fit'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                        Start Learning Today
                        <FaArrowRight />
                    </div>
                </CTAButton>
            </div>


        </div>

      </div>
    </div>
  )
}

export default InstructorSection
