import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import Footer from "../components/common/Footer";
import { getCatalogaPageData } from "../services/operations/CategoryAPI";
import CourseCard from "../components/core/Catelog/CourseCard";
import CourseSlider from "../components/core/Catelog/CourseSlider";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [catagoryId, setCatagoryId] = useState("");
  useEffect(() => {
    const catagoryID = async () => {
      const allCatagories = await apiConnector(
        "GET",
        categories.CATEGORIES_API
      );
      const catagory_Id = allCatagories?.data?.data.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      setCatagoryId(catagory_Id);
    };
    catagoryID();
  }, [catalogName]);


  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(catagoryId);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (catagoryId) {
      getCategoryDetails();
    }
  }, [catagoryId]);
  return (
    <div>
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex md:min-h-[260px] min-h-[190px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>
      <div>
        <div className="mx-auto box-content w-full max-w-maxContentTab md:px-4 md:py-12 px-0 py-6 lg:max-w-maxContent">
          <div className="text-white md:text-3xl text-lg">Courses to get Started</div>
          <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          </div>
          <div>
            <CourseSlider courses={catalogPageData?.data?.selectedCategory?.course}/>
          </div>
        </div>
        <div>
          <div className=" mx-auto box-content w-full max-w-maxContentTab md:px-4 md:py-12 px-0 py-6 lg:max-w-maxContent">
            <div className="text-white md:text-3xl text-lg">Frequently Bought</div>
              <div className="py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {
                    catalogPageData?.data?.mostSellingCourses?.slice(0,4)?.map((course,index)=>(
                      <CourseCard course={course} index={index} height={"h-[250px]"}/>
                    ))
                  }
                </div>
            </div>
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
