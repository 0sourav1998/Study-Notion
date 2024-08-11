import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    completedVideo : localStorage.getItem("completedLectures") ? JSON.parse(localStorage.getItem("completedLectures")) : []
}

const completedVideoSlice = createSlice({
    name : "completedVideos",
    initialState  ,
    reducers : {
        setCompletedVideos : (state,action) =>{
            state.completedVideo = [...state.completedVideo, action.payload]
        }
    }
}) ;

export const {setCompletedVideos} = completedVideoSlice.actions ;

export default completedVideoSlice.reducer ;