import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconButton";
import { useDispatch, useSelector } from "react-redux";
import NestedView from "./NestedView";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import {
  updateSection,
  createSection,
} from "../../../../../services/operations/courseDetailsAPI";

const CourseBuilder = () => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [editSection, setEditSection] = useState(null);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    setLoading(true);
    let result;
    if (editSection) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSection,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        { sectionName: data.sectionName, courseId: course._id },
        token
      );
    }
    
    if(result){
      dispatch(setCourse(result)) ;
      setEditSection(null) ;
      setValue("sectionName" , "")
    }
    setLoading(false) ;
  };
  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };
  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast One Section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast One Sub Section Section");
      return;
    }
    dispatch(setStep(3));
  };
  const cancelEdit = () => {
    setEditSection(null);
    setValue("sectionName", "");
  };
  return (
    <div>
      <form className="text-white " onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="sectionName">Section Name</label>
          <input
            id="sectionName"
            placeholder="create section"
            className="w-full text-black"
            {...register("sectionName", { required: true })}
          />
          <IconBtn
            type="submit"
            text={editSection ? "Save Changes" : "Create"}
            customClass={"text-white"}
          />
        </div>
        <div>
          {editSection && (
            <button type="button" onClick={cancelEdit}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      <div>{course?.courseContent?.length > 0 && <NestedView />}</div>
      <div>
        <button type="button" onClick={goBack} className="text-white rounded-md p-2 bg-richblack-300 mr-3">
          Back
        </button>
        <button type="button" onClick={goToNext} className="text-white rounded-md p-2 bg-richblack-300">
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseBuilder;
