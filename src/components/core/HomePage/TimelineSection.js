import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
];

const TimelineSection = () => {
  return (
    <div>
      <div className='flex lg:flex-row flex-col sm:gap-15  items-center'>

        <div className='lg:w-[45%] w-full flex flex-col gap-5'>
            {
                timeline.map( (element, index) => {
                    return (
                        <div className='flex flex-row gap-6' key={index}>

                            <div className='justify-center sm:w-[50px] sm:h-[50px] w-[30px] h-[30px] bg-white flex items-center'>
                                <img src={element.Logo} alt='Logo'/>
                            </div>

                            <div>
                                <h2 className='font-semibold sm:text-[18px] text-[14px]'>{element.heading}</h2>
                                <p className='sm:text-base text-[12px]'>{element.Description}</p>
                            </div>

                        </div>
                    )
                } )
            }
        </div>
        <div className='relative shadow-blue-200'>

            <img  src={timelineImage}
            alt="timelineImage"
            className='shadow-white object-cover h-fit mt-12 lg:mt-0'
            />

            <div className='absolute lg:w-fit w-52 bg-caribbeangreen-700 flex flex-row text-white uppercase sm:py-7 py-4
                            left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <div className='flex flex-row lg:gap-5 gap-2 items-center border-r border-caribbeangreen-300 lg:px-7 px-3'>
                    <p className='sm:text-3xl sm:font-bold text-sm font-semibold'>10</p>
                    <p className='text-caribbeangreen-300 sm:text-sm text-[8px]'>Years of Experience</p>
                </div>

                <div className='flex lg:gap-5 gap-2 items-center lg:px-7 px-3'>
                <p className='sm:text-3xl sm:font-bold text-sm font-semibold'>250</p>
                    <p className='text-caribbeangreen-300 sm:text-sm text-[8px]'>Type of Courses</p>
                </div>

            </div>

        </div>

      </div>
    </div>
  )
}

export default TimelineSection
