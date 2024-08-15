import React from 'react'
import IconBtn from './IconButton'

const confirmationModal = ({modalData}) => {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="sm:w-11/12 w-[200px] max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <p className="sm:text-2xl text-lg font-semibold text-richblack-5">{modalData.text1}</p>
        <p className="sm:text-lg text-[12px] mt-3 mb-5 leading-6 text-richblack-200">{modalData.text2}</p>
        <div className="flex items-center gap-x-4">
        <IconBtn text={modalData.btn1Text} onclick={modalData.btn1Handle}/>
        <button className="cursor-pointer rounded-md sm:text-[20px] text-[13px] bg-richblack-200 sm:py-[7px] sm:px-[18px] py-1 px-2 font-semibold text-richblack-900" onClick={modalData.btn2Handle}>
            {modalData.btn2Text}
        </button>
      </div>
      </div>
    </div>
  )
}

export default confirmationModal
