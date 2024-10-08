import React from 'react'
import {toast} from "react-hot-toast"
import { apiConnector } from '../apiconnector';
import { catalogData , categories } from '../apis';

export const getAllCategory = async()=>{
  let result = [] ;
  try{
    const response = await apiConnector("GET", categories.CATEGORIES_API) ;
    result = response.data.data ;
  }catch(error){
    console.log("Error in fetching category",error.message)
  }
  return result ;
}

export const getCatalogaPageData = async(categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, 
        {categoryId: categoryId,});

        if(!response?.data?.success)
            throw new Error("Could not Fetch Category page data");

        result = response?.data; 

  }
  catch(error) {
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
}

