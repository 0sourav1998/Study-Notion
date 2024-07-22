const Tag = require("../models/Tag");

exports.createTag = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const tagDetails = await Tag.create({
      name: name,
      description: description,
    });

    return res.status(200).json({
      success: true,
      message: "Tag created Successfully",
      tagDetails,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while creating Tag",
    });
  }
};


//show all tags

exports.showAllTags = async(req,res)=>{
    try{
        const allTags = await Tag.find({},{name:true,description : true}) ;
        return res.status(200).json({
            success : true ,
            message : "Tags fetched successfully" ,
            allTags ,
        })
    }catch(error){
        return res.status(400).json({
            success: false,
            message: "Error while fetching Tags",
          });
    }
}