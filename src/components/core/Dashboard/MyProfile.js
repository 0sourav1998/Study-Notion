import { RiEditBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import IconBtn from "../../common/IconButton";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { updateProfilePicture } from "../../../services/operations/profileAPI";
import { setUser } from "../../../slices/profileSlice";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageRef = useRef();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handlePicChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setImage(file);
    }
  };

  const uploadProfilePicture = async () => {
    if (!image) {
      toast.error("Please select an image first.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("image", image);
      const result = await updateProfilePicture(formData, token);
      if (result) {
        console.log(result);
        setImagePreview(null);
        dispatch(setUser(result));
        toast.success("Profile picture updated successfully!");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Could not upload profile picture");
    }
  };

  return (
    <>
      <h1 className="sm:mb-14 mb-6 text-xl sm:text-3xl font-medium text-richblack-5 text-center lg:text-left">
        My Profile
      </h1>
      <div className="flex flex-col lg:flex-row items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center gap-x-4 mb-4 lg:mb-0">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[30px] sm:w-[78px] rounded-full object-cover mb-4"
          />
          <div className="space-y-1 text-center sm:text-left">
            <p className="sm:text-lg sm:font-semibold text-xs font-normal text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="sm:text-sm text-[8px] text-richblack-300">
              {user?.email}
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:gap-4 gap-2 items-center">
          <div className="mt-4"> 
            {imagePreview && (
              <img
                src={imagePreview}
                alt={`profile-${user?.firstName}`}
                className="aspect-square w-[40px] h-[40px] sm:w-[78px] rounded-full object-cover mb-4"
              />
            )}
          </div>
          <div className="flex flex-col">
            <input
              type="file"
              className="hidden"
              ref={imageRef}
              onChange={handlePicChange}
            />
            <button
              onClick={() => imageRef.current.click()}
              className="bg-yellow-300 p-2 rounded-md text-white font-semibold mt-2"
            >
              Choose From Galary
            </button>
            <button
              onClick={uploadProfilePicture}
              className="bg-yellow-300 p-2 rounded-md text-white font-semibold mt-2"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
      <div className="sm:my-10 my-4 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 lg:px-12">
        <div className="flex  gap-3 w-full items-center justify-between">
          <p className="sm:text-lg sm:font-semibold text:xs font:normal text-richblack-5">
            About
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } sm:text-sm sm:font-medium text-[10px] font-normal -mt-4 sm:-mt-0`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 lg:px-12">
        <div className="flex sm:flex-row flex-col gap-2 w-full items-center justify-between">
          <p className="sm:text-lg sm:font-semibold sm:text-[20px] text-[9px] font-light text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            className="bg-yellow-200"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex flex-col lg:flex-row max-w-[500px] justify-between gap-y-3 lg:gap-y-0">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-1 sm:text-sm text-xs text-richblack-600">
                First Name
              </p>
              <p className="sm:text-sm text-xs font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-1 sm:text-sm text-xs text-richblack-600">
                Email
              </p>
              <p className="sm:text-sm text-xs text-wrap font-medium text-richblack-5">
                <span className="text-wrap w-[90%]">{user?.email}</span>
              </p>
            </div>
            <div>
              <p className="mb-1 sm:text-sm text-xs text-richblack-600">
                Gender
              </p>
              <p className="sm:text-sm text-xs font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-1 sm:text-sm text-xs text-richblack-600">
                Last Name
              </p>
              <p className="sm:text-sm text-xs font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-1 sm:text-sm text-xs text-richblack-600">
                Phone Number
              </p>
              <p className="sm:text-sm text-xs font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-1 sm:text-sm text-xs text-richblack-600">
                Date Of Birth
              </p>
              <p className="sm:text-sm text-xs font-medium text-richblack-5">
                {user?.additionalDetails?.dateOfBirth ?? "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
