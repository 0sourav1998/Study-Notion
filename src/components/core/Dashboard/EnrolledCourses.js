export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
    } catch (error) {
      console.error("Could not fetch enrolled courses.");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <>
      <div className="text-2xl sm:text-3xl text-richblack-50">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-4 sm:my-8 text-richblack-5">
          <div className="flex flex-col sm:flex-row rounded-t-lg bg-richblack-500">
            <p className="w-full sm:w-[45%] px-2 py-2 sm:px-5 sm:py-3">Course Name</p>
            <p className="w-full sm:w-1/4 px-2 py-2 sm:px-2 sm:py-3">Duration</p>
            <p className="w-full sm:flex-1 px-2 py-2 sm:px-2 sm:py-3">Progress</p>
          </div>
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex flex-col sm:flex-row items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-full sm:w-[45%] cursor-pointer items-center gap-2 sm:gap-4 px-2 py-2 sm:px-5 sm:py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/subSection/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  );
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-1 sm:gap-2">
                  <p className="text-sm sm:text-base font-semibold">{course.courseName}</p>
                  <p className="text-xs sm:text-sm text-richblack-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-1/4 px-2 py-2 sm:px-2 sm:py-3">{course?.totalDuration}</div>
              <div className="flex w-full sm:w-1/5 flex-col gap-1 sm:gap-2 px-2 py-2 sm:px-2 sm:py-3">
                <p className="text-xs sm:text-sm">Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="6px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
