import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/studentFeatureAPI";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { setCourse } from "../slices/courseSlice";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import ConfirmationModal from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/RatingStars";
import { formatDate } from "../services/formatDate";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import CourseAccordionBar from '../components/core/Course/CourseAccordian'

import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";

const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  useEffect(() => {
    const getCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        setCourseData(result);
      } catch (error) {
        console.log("Could not fetch coursse details");
      }
    };
    getCourseFullDetails();
  }, [courseId]);

  const [avgReviewCount, setAverageReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(courseData?.data[0]?.ratingAndReviews);
    setAverageReviewCount(count);
  }, [courseData]);

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    courseData?.data?.[0]?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
    console.log("Total Number of lectures",totalNoOfLectures)
  }, [courseData]);

  const [isActive, setIsActive] = useState(Array(0));
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((e) => e !== id)
    );
  };

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "you are not Logged in",
      text2: "Please login to purchase the course",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  if (loading || !courseData) {
    return <div>Loading...</div>;
  }

  if (!courseData.success) {
    return (
      <div>
        <Error />
      </div>
    );
  }
  const {
    courseName,
    courseDescription,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentEnrolled,
    createdAt,
    price,
  } = courseData.data[0];

  return (
    <div className={`relative w-full bg-richblack-800`}>
      <div
        className={`z-30 my-5 flex flex-col lg:flex-row justify-center gap-4 py-5 text-lg text-richblack-5`}
      >
        <div className="lg:mr-[150px] mr-0 ml-10 lg:ml-0">
          <p className="lg:text-4xl text-2xl w-full my-5 font-bold text-richblack-5">
            {courseName}
          </p>
          <p className={`text-richblack-200 my-5`}>{courseDescription}</p>
          <div className="text-md flex flex-wrap items-center gap-2">
            <span className="text-yellow-25 my-5">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} Star_Size={24} className='my-5'/>
            <span className="my-5">{`(${ratingAndReviews?.length} reviews)`}</span>
            <span className="my-5">{studentEnrolled?.length || 0} Students Enrolled</span>
          </div>

          <div className="mb-5">
            <p>Created By {`${instructor.firstName}`}</p>
          </div>

          <div className="flex flex-wrap gap-5 text-lg">
            <p className="flex items-center gap-2">
              Created At {formatDate(createdAt)}
            </p>
            <p className="flex items-center gap-2">
              {" "}
              <HiOutlineGlobeAlt /> English
            </p>
          </div>
        </div>

        <div>
          <CourseDetailsCard
            course={courseData?.data[0]}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}
          />
        </div>
      </div>
    <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]"></div>
      <div className="my-8 border border-richblack-600 p-8">
        <p className="text-3xl font-semibold text-richblack-5"> What You WIll learn</p>
        <div className="text-richblack-5 mt-5 font-semibold">{whatYouWillLearn}</div>
      </div>

      <div className="mx-10">
        <div>
          <p className="text-4xl font-bold">Course Content:</p>
        </div>

        <div className="flex gap-x-3 justify-between">
          <div className="flex flex-col w-[1080px]">
            <div className="py-4 w-full">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseDetails;
