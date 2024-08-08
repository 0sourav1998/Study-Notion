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
  console.log("Catelog Name..................",catalogName)
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [catagoryId, setCatagoryId] = useState("");
  useEffect(() => {
    const catagoryID = async () => {
      const allCatagories = await apiConnector(
        "GET",
        categories.CATEGORIES_API
      );
      // console.log(allCatagories)
      const catagory_Id = allCatagories?.data?.data.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      console.log(catagory_Id);
      setCatagoryId(catagory_Id);
    };
    catagoryID();
  }, [catalogName]);

  console.log("Catelog Page Data .....",catalogPageData)

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(catagoryId);
        console.log("PRinting res: ", res);
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
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
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
      {/* Section-1*/}
      <div>
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <div className="text-white text-3xl">Courses to get Started</div>
          <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          </div>
          <div>
            <CourseSlider courses={catalogPageData?.data?.selectedCategory?.course}/>
          </div>
        </div>
        <div>
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="text-white text-3xl">Frequently Bought</div>
              <div className="py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  {
                    catalogPageData?.data?.mostSellingCourses?.slice(0,4).map((course,index)=>(
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
