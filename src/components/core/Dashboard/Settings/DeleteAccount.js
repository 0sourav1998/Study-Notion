import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <div className="my-10 flex lg:flex-row flex-col sm:gap-x-5 gap-x-1 gap-4 rounded-md border-[1px] border-pink-700 bg-pink-900 sm:p-8 p-2 sm:px-12 px-4">
        <div className="flex aspect-square sm:ml-12 ml-10 lg:h-14 lg:w-14 h-10 w-10 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="sm:text-3xl text-3xl text-pink-200 p-2" />
        </div>
        <div className="flex flex-col gap-4 space-y-2">
          <h2 className="lg:text-lg ml-4 text-medium lg:font-semibold text-xs font-normal text-richblack-5">
            Delete Account
          </h2>
          <div className="lg:w-3/5  w-full text-pink-25">
            <p className="mb-4 text-[10px] sm:text-lg">Would you like to delete account?</p>
            <p className="sm:text-xs text-[8px]">
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer italic text-pink-300"
            onClick={handleDeleteAccount}
          >
            I want to delete my account.
          </button>
        </div>
      </div>
    </>
  )
}