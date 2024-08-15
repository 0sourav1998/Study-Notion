import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress  from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "../HomePage/Button"

const LearningLanguageSection = () => {
  return (
    <div className='sm:mt-[130px] mt-[50px] mb-32'>
      <div className='flex flex-col gap-5 items-center'>

            <div className='sm:text-4xl text-xl font-semibold text-center w-full'>
                Your Swiss Knife for
                <HighlightText text={" learning any language"} />
            </div>

            <div className='text-center text-richblack-600 mx-auto sm:text-base text-[13px] font-medium lg:w-[70%] w-[95%]'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='flex lg:flex-row flex-col items-center justify-center mt-5'>
                <img 
                    src = {know_your_progress}
                    alt = "KNowYourProgressImage"
                    className='object-contain lg:-mr-32 -mr:0'
                />
                <img 
                    src = {compare_with_others}
                    alt = "KNowYourProgressImage"
                    className='object-contain'
                />
                <img 
                    src = {plan_your_lesson}
                    alt = "KNowYourProgressImage"
                    className='object-contain lg:-ml-36 -mr-0'
                />
            </div>

            <div className='w-fit'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div>
                        Learn more
                    </div>
                </CTAButton>
            </div>

      </div>
    </div>
  )
}

export default LearningLanguageSection
