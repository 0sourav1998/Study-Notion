import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import {Link} from "react-router-dom"
import HighlightText from '../components/core/HomePage/HighlightText'

import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'

const Home = () => {
  return (
    <div>
      <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
      text-white justify-between'>

        <Link to={"/signup"}>
            <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
            transition-all duration-200 hover:scale-95 w-fit'>
                <div className='flex flex-row items-center gap-2 rounded-full sm:px-10 px-7 py-[5px]
                transition-all duration-200 group-hover:bg-richblack-900'>
                    <p className='sm:text-normal text-xs'>Become an Instructor</p>
                    <FaArrowRight />
                </div>
            </div>

        </Link>

        <div className='text-center sm:text-4xl text-2xl font-semibold mt-7 mr-2'>
            Empower Your Future with
            <HighlightText text={"Coding Skills"} />
        </div>

        <div className=' mt-4 w-[90%] text-center sm:text-lg text-xs mr-2 font-bold text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
        </div>

        <div className='flex flex-row gap-7 mt-8'>
            <CTAButton active={true} linkto={"/signup"}> 
                Learn More
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}> 
                Book a Demo
            </CTAButton>
        </div>

        <div className='mx-3 my-12 shadow-blue-200 mr-6'>
            <video
            muted
            loop
            autoPlay
            >
            <source  src={Banner} type="video/mp4" />
            </video>
        </div>

        <div>
            <CodeBlocks 
                position={"lg:flex-row flex-col"}
                heading={
                    <div className='sm:text-4xl text-base sm:w-[200%] w-[180%] lg:w-full font-semibold'>
                        Unlock Your
                        {" "}
                        <HighlightText text={"coding potential"}/>
                        {" "}
                        with our online courses
                    </div>
                }
                subheading = {
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctabtn1={
                    {
                        btnText: "try it yourself",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "learn more",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`}
                codeColor={"text-yellow-25"}
            />
        </div>

        <div>
            <CodeBlocks 
                position={"lg:flex-row-reverse flex-col"}
                heading={
                    <div className='sm:text-4xl text-base sm:w-[200%] w-[190%] lg:w-full font-semibold'>
                        Unlock Your
                        <HighlightText text={"coding potential"}/>
                        with our online courses
                    </div>
                }
                subheading = {
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctabtn1={
                    {
                        btnText: "try it yourself",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "learn more",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`}
                codeColor={"text-yellow-25"}
            />
        </div>

            <ExploreMore />
      </div>

      <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg sm:h-[310px] h-[200px]'>

                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between sm:gap-5 gap-1 mx-auto'>
                    <div className='sm:h-[150px] h-[70px]'></div>
                    <div className='flex flex-row sm:gap-7 gap-2 text-white sm:mr-0 mr-4'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center lg:gap-3 gap-1 sm:text-sm text-[9px]' >
                                Explore Full Catalog
                                <FaArrowRight />
                            </div>
                            
                        </CTAButton>
                        <CTAButton active={false} linkto={"/signup"}>
                            <div className='flex items-center lg:gap-3 gap-1 sm:text-sm text-[9px]'>
                                Learn more
                            </div>
                        </CTAButton>
                    </div>

                </div>


            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

                <div className='flex lg:flex-row flex-col gap-5 sm:mb-10 mb-4 sm:mt-[95px] mt-[40px] w-11/12 lg:ml-12 -ml-4'>
                    <div className='sm:text-4xl text-2xl lg:font-semibold lg:w-[45%] w-full'>
                        Get the Skills you need for a
                        <HighlightText text={"Job that is in demand"} />
                    </div>

                    <div className='flex flex-col gap-10 lg:w-[40%] lg:items-start w-full'>
                    <div className='sm:text-[16px] text-[13px]'>
                    The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    </div>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div >
                            Learn more
                        </div>
                    </CTAButton>
                    </div>

                </div>
                
                

                <TimelineSection />

                <LearningLanguageSection />

            </div>

            

      </div>


      <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white sm:mb-10 mb-5'>

            <InstructorSection />
            
      </div>
      <Footer />

    </div>
  )
}

export default Home
