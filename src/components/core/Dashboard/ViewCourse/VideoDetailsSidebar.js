import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../../common/IconButton";
import { BsChevronDown } from "react-icons/bs";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [videoBarActive, setVideoBarActive] = useState("");
  const [activeStatus, setActiveStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state)=>state.auth)

  const { subSectionId } = useParams();
  const { sectionId } = useParams();
  const { courseId } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);

  const {completedVideo} = useSelector((state)=>state.completedVideos)

  const handleAddReview = () => {
    setReviewModal(true);
  };


  const activeOrNot = () => {
    if (!Array.isArray(courseSectionData)) return;
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);
    const activeSubSectionId =
      courseSectionData[currentSectionIndex]?.subSection?.[
        currentSubSectionIndex
      ]?._id;
    //set current section here
    setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
    // setActiveStatus(sectionId) ;
    //set current sub-section here
    setVideoBarActive(activeSubSectionId);
    // setVideoBarActive(subSectionId)
  };
  useEffect(() => {
    activeOrNot();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">
            <button onClick={() => navigate("/dashboard/enrolled-courses")}>
              Back
            </button>
            <button>
              <IconBtn text="Add A Review" onclick={handleAddReview} />
            </button>
          </div>
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
                Total Content : {totalNoOfLectures} Video(s)
            </p>
          </div>
        </div>
        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData?.map((section, index) => (
            <div
              key={index}
              onClick={() => setActiveStatus(section?._id)}
              className="mt-2 cursor-pointer text-sm text-richblack-5"
            >
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  <p>{section?.sectionName}</p>
                </div>
                <div className="flex items-center gap-3">
                  {/* <span className="text-[12px] font-medium">
                  Lession {course?.subSection.length}
                </span> */}
                  <span
                    className={`${
                      activeStatus === section?.sectionName
                        ? "rotate-0"
                        : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>
              <div className="transition-[height] duration-500 ease-in-out">
                {activeStatus === section?._id &&
                  section?.subSection?.map((topic, index) => (
                    <div
                      key={index}
                      className={`flex gap-3  px-5 py-2 ${
                        videoBarActive === topic._id
                          ? "bg-yellow-200 font-semibold text-richblack-800"
                          : "hover:bg-richblack-900 text-richblack-25"
                      } `}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${section._id}/subSection/${topic._id}`
                        );
                        setVideoBarActive(topic._id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedVideo.includes(topic._id)}
                      />
                      <span>{topic?.title}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;
