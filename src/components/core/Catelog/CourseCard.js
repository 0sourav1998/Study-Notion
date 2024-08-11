import React, { useEffect, useState } from "react";
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";
import { Link } from "react-router-dom";

const CourseCard = ({ course, height }) => {
  console.log("COURSE",course)
  const [avgRatingCount, setAvgRatingCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews);
    setAvgRatingCount(count);
  });
  return (
    <div>
      <Link to={`/course/${course._id}`}>
        <div>
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt=""
              className={`${height} w-[350px] rounded-xl object-cover `}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-richblack-5">{course?.courseName}</p>
            <p className="text-sm text-richblack-50">
              By : {course?.instructor?.firstName}{" "}
              {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-5">{avgRatingCount || 0}</span>
              <RatingStars Review_Count={avgRatingCount} />
              <p className="text-richblack-400">
                {course?.ratingAndReviews?.length} Ratings
              </p>
            </div>
            <p className="text-xl text-richblack-5">Rs : {course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
