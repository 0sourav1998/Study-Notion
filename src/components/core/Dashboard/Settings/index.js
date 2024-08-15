
import EditProfile from "./EditProfile"
import DeleteAccount from "./DeleteAccount"



export default function Settings() {
  return (
    <>
      <h1 className="sm:mb-14 mb-6 sm:text-3xl text-xl -mt-6 sm:-mt-0 text-center font-medium text-richblack-5">
        Edit Profile
      </h1>
      <EditProfile />
      <DeleteAccount />
    </>
  )
}