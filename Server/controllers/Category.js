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
        console.log(allCategories)
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