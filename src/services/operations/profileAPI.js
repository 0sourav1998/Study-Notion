import { toast } from "react-hot-toast";

import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { profileEndpoints , settingsEndpoints } from "../apis";
import { logout } from "./authAPI";

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_STATS_DATA
} = profileEndpoints;

const {UPDATE_DISPLAY_PICTURE_API} = settingsEndpoints;

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorisation: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
      dispatch(setUser({ ...response.data.data, image: userImage }));
    } catch (error) {
      dispatch(logout(navigate));
      toast.error("Could Not Get User Details");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    toast.error("Could Not Get Enrolled Courses");
  }
  toast.dismiss(toastId);
  return result;
}

export async function getInstructorStats(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_INSTRUCTOR_STATS_DATA,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    result = response?.data?.courses ;
  } catch (error) {
  }
  toast.dismiss(toastId)
  return result ;
}

export const updateProfilePicture = async(formData,token)=>{
  const toastId = toast.loading("Loading...");
  let result ;
  try {
    const response = await apiConnector("POST",UPDATE_DISPLAY_PICTURE_API,formData,{
      Authorization : `Bearer ${token}`
    });
    console.log(response)
    if(response?.data?.success){
      result = response?.data?.user;
    }
  } catch (error) {
    console.log(error.message)
    toast.error("Could Not Upload Profile Picture");
  }
  toast.dismiss(toastId);
  return result ;
}
