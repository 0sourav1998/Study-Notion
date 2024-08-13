import { toast } from "react-hot-toast"

import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  DELETE_PROFILE_API,
} = settingsEndpoints


export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.data))
    } catch (error) {
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, {
        ...formData,
        token: token,
      })
      if (!response || !response.data) {
        throw new Error("Invalid response from server")
      }

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      const updatedUserDetails = response.data.updatedUserDetails;
      if (!updatedUserDetails) {
        throw new Error("No additional details found in response")
      }

      const userImage = updatedUserDetails.image
        ? updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`

      dispatch(setUser({ ...updatedUserDetails, image: userImage }))

      toast.success("Profile Updated Successfully")
    } catch (error) {
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API,{
        token: token,
      })
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}