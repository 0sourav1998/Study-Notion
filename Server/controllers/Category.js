const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    console.log("1st")
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    console.log("2nd")
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log("Category Details.........",categoryDetails)
    return res.status(200).json({
      success: true,
      message: "category created Successfully",
      categoryDetails,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while creating Category",
    });
  }
};


//show all Category

exports.showAllCategories = async(req,res)=>{
    try{
        const allCategories = await Category.find({},{name:true,description : true}) ;
        // console.log(allCategories)
        return res.status(200).json({
            success : true ,
            message : "Categories fetched successfully" ,
            data : allCategories ,
        })
    }catch(error){
        return res.status(400).json({
            success: false,
            message: "Error while fetching Categories",
          });
    }
}

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body
    console.log("PRINTING CATEGORY ID: ", categoryId);
    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec()


    console.log("SELECTED COURSE", selectedCategory)
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }
    // Handle the case when there are no courses
    if (selectedCategory.course.length === 0) {
      console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }
    console.log(">>>>>>>>>>>>>>>>>>>>")
  //   Get courses for other categories
    // const categoriesExceptSelected = await Category.find({
    //   _id: { $ne: categoryId },
    // })
    // let differentCategory = await Category.findOne(
    //   categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
    //     ._id
    // )
    //   .populate({
    //     path: "courses",
    //     match: { status: "Published" },
    //   })
    //   .exec()
    //   console.log("Different COURSE", differentCategory)
    // // Get top-selling courses across all categories
    
    const allCategories = await Category.find()
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: {
          path: "instructor",
      },
      })
      .exec()
    const allCourses = allCategories.flatMap((category) => category.course)
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)
     // console.log("mostSellingCourses COURSE", mostSellingCourses)
     console.log("Most Selling.........",mostSellingCourses)
     console.log("SelectedCatagory........",selectedCategory)
    //  console.log("Different Catagories..........",differentCategory)
    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
      //   differentCategory,
        mostSellingCourses,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}