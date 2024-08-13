const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
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




exports.showAllCategories = async(req,res)=>{
    try{
        const allCategories = await Category.find({},{name:true,description : true}) ;
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
    const { categoryId } = req.body ;
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "course",
        match: { status: "Published" },
        populate : "instructor" ,
      })
      .exec()


    if (!selectedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    } ;

    if (selectedCategory.course.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }
  
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
    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
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