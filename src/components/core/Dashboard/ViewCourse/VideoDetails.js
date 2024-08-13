import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Player, BigPlayButton } from "video-react";
import "video-react/dist/video-react.css";
import IconBtn from "../../../common/IconButton";
import {markLectureAsComplete} from '../../../../services/operations/courseDetailsAPI'
import { updateCompletedLectures } from "../../../../slices/viewCourseSlice";
import { setCompletedVideos } from "../../../../slices/completedVideos";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const { courseEntireData, completedLectures, courseSectionData } =
    useSelector((state) => state.viewCourse);
    const {completedVideo} = useSelector((state)=>state.completedVideos)
    
  
  const [videoEnded, setVideoEnded] = useState(false);
  const playerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const videoDetails = () => {
      if (!courseSectionData) {
        return;
      }
      if (!courseId || !sectionId || !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filteredSection = courseSectionData?.filter(
          (section) => section._id === sectionId
        );
        const filteredVideo = filteredSection?.[0]?.subSection?.filter(
          (subSection) => subSection._id === subSectionId
        );
        if (filteredSection.length === 0 || !filteredSection[0]?.subSection) {
          console.error("Section or sub-section not found");
          return;
        }
        setVideoData(filteredVideo);
        setVideoEnded(false);
      }
    };
    videoDetails();
  }, [courseSectionData, courseEntireData, location.pathname]);
  const goToNext = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex =
      courseSectionData?.[0]?.subSection?.findIndex(
        (data) => data._id === subSectionId
      );
    const subSectionLength =
      courseSectionData?.[currentSectionIndex]?.subSection?.length;
    if (currentSubSectionIndex !== subSectionLength - 1) {
      const nextSubSectionId =
        courseSectionData?.[currentSectionIndex]?.subSection?.[
          currentSectionIndex + 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/subSection/${nextSubSectionId}`
      );
    } else {
      const currentSectionId = courseSectionData?.[currentSectionIndex + 1]._id;
      const currentSubSectionId =
        courseSectionData?.[currentSectionIndex + 1]?.subSection?.[0]._id;
      navigate(
        `/view-course/${courseId}/section/${currentSectionId}/subSection/${currentSubSectionId}`
      );
    }
  };
  const goBack = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionId);
    const subSectionLength =
      courseSectionData?.[currentSectionIndex]?.subSection?.length;
    if (currentSubSectionIndex !== 0) {
      const SubSectionId =
        courseSectionData?.[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/subSection/${SubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const subSectionLength =
        courseSectionData[currentSectionIndex - 1]?.subSection?.length;
      const prevSubSectionId =
        courseSectionData?.[currentSectionIndex - 1].subSection?.[
          subSectionLength - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/subSection/${prevSubSectionId}`
      );
    }
  };
  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex =
      courseSectionData?.[0]?.subSection?.findIndex(
        (data) => data._id === subSectionId
      );
    const subSectionLength =
      courseSectionData?.[currentSectionIndex]?.subSection?.length;
    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === subSectionLength - 1
    ) {
      return true;
    } else {
      return false;
    }
  };
  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex =
      courseSectionData?.[0]?.subSection?.findIndex(
        (data) => data._id === subSectionId
      );
    const subSectionLength =
      courseSectionData?.[currentSectionIndex]?.subSection?.length;
    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };
  const handleMarkAsComplete = async() => {
    setLoading(true)
    const response = await markLectureAsComplete({
      courseId : courseId ,
      subSectionId : subSectionId
    },token)
    setLoading(false)
    if(response){
      dispatch(updateCompletedLectures(subSectionId));
      dispatch(setCompletedVideos(subSectionId))
    }
  };
  return <div className="flex flex-col gap-5 text-white ">
    {!videoData ? (
      <div>No Data Found </div>
    ) : (
      <Player
        ref={playerRef}
        aspectRatio="16:9"
        playsInline
        onEnded={() => setVideoEnded(true)}
        src={videoData[0]?.videoUrl}
        className="relative"
        fluid="true"
      >
        <BigPlayButton position="center" />
        {videoEnded && (
          <div
            style={{
              backgroundImage:
                "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
            }}
            className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter gap-6"
          >
            {!completedVideo.includes(subSectionId) && (
              <IconBtn
                disabled={loading}
                onclick={() => handleMarkAsComplete()}
                text={!loading ? "Mark As Completed" : "Loading..."}
                customClasses="text-xl max-w-max px-4 mx-auto mb-4"
              />
            )}
            <IconBtn
              disabled={loading}
              onclick={() => {
                if (playerRef?.current) {
                  playerRef?.current?.seek(0);
                  setVideoEnded(false);
                }
              }}
              text="Rewatch"
              customClasses="text-xl max-w-max px-4 mx-auto mt-2 absolute top-[50%]"
            />
            <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
              {!isFirstVideo() && (
                <button
                  disabled={loading}
                  onClick={goBack}
                  className="blackButton"
                >
                  Prev
                </button>
              )}
              {!isLastVideo() && (
                <button
                  disabled={loading}
                  onClick={goToNext}
                  className="blackButton"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </Player>
    )}
    <h1 className="mt-4 text-3xl font-semibold ml-4 text-richblack-5">{videoData?.[0]?.title}</h1>
    <p className="pt-2 ml-4 pb-6">{videoData?.[0]?.description}</p>
  </div>;
};

export default VideoDetails;
