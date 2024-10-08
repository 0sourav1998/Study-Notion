const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { UploadImageToCloudinary } = require("../utils/UploadImageToCloudinary");
require("dotenv").config();

exports.createSubSection = async (req, res) => {
  try {
    const { title, description,  sectionId } = req.body;
    const { video } = req.files;
    if (!title || !description  || !sectionId || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const videoDetails = await UploadImageToCloudinary(
      video,
      process.env.CLOUDINARY_FOLDER_NAME
    );
    const newSubSection = await SubSection.create({
      title: title,
      description: description,
      videoUrl: videoDetails.secure_url,
      timeDuration : videoDetails.duration
    });
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: newSubSection._id } },
      { new: true }
    ).populate("subSection");
    return res.status(200).json({
      success: true,
      message: "SubSection created Successfully",
      data:updatedSection,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error While creating Sub Section",
    });
  }
};

exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId,subSectionId, title, description } = req.body ;
      const subSection = await SubSection.findById(subSectionId) ;
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await UploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      const updatedSection = await Section.findById(sectionId).populate("subSection")


      return res.json({
        success: true,
        data:updatedSection,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }
  
  exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }

      const updatedSection = await Section.findById(sectionId).populate("subSection");
  
      return res.json({
        success: true,
        data:updatedSection,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }
