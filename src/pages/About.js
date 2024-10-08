import React from 'react'
import HighlightText from "../components/core/HomePage/HighlightText"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'

const About = () => {
  return (
    <div className="bg-richblack-700">
      <section>
        <div className="relative mx-auto flex md:w-11/12 w-full pr-1 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
            <header className="mx-auto md:py-20 my-10 md:text-4xl text-lg font-semibold lg:w-[70%]">
                Driving Innovation in Online Education for a 
                <HighlightText text={"Brighter Future"}/>
                <p className="mx-auto mt-3 text-center font-medium text-richblack-300 w-[95%]  text-sm md:text-normal">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
            </header>
            <div className='className="sm:h-[20px] lg:h-[150px]'></div>
            <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
                <img src={BannerImage1} alt=''/>
                <img src={BannerImage2} alt=''/>
                <img src={BannerImage3} alt=''/>
            </div>
        </div>
      </section>

      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
        <div className="md:h-[100px] h-[20px]"></div>
            <Quote/>
        </div>
      </section>

      <section>
        <div className="mx-auto flex md:w-11/12 w-full p-1 md:p-0 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
            
            <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
                
                <div className="md:my-24 my-6 flex lg:w-[50%] flex-col gap-10">
                    <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text md:text-4xl text-xl font-semibold text-transparent lg:w-[70%] w-[100%]">Our Founding Story</h1>

                    <p className="md:text-base text-sm font-medium text-richblack-300 lg:w-[95%]">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                    <p className="md:text-base text-sm font-medium text-richblack-300 lg:w-[95%]">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                </div>
                <div className='md:w-11/12 w-full mx-auto'>
                    <img  src={FoundingStory} alt="Founding Strory"/>
                </div>
            </div>

            <div className='flex lg:flex-row flex-col gap-6 md:text-base text-xs'>
                <div>
                    <h1>Our Vision</h1>
                    <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                </div>
                <div>
                    <h1>
                        Our Mission
                    </h1>
                    <p>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                </div>
            </div>
        </div>
      </section>  

      
      <StatsComponent/>  
      
      <section className="mx-auto md:mt-20 mt-10 flex md:w-11/12 w-full max-w-maxContent flex-col justify-between md:gap-10 gap-4 text-white">
        <LearningGrid />
        <ContactFormSection />
      </section>

      <Footer/>

    </div>
  )
}

export default About
