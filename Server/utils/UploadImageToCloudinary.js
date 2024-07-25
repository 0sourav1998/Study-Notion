const cloudinary = require('cloudinary').v2; // Ensure you have cloudinary configured

exports.UploadImageToCloudinary = async (file, folder, height, quality) => {
    // Ensure the file and tempFilePath are present
    if (!file || !file.tempFilePath) {
        throw new Error('File is missing or does not have a tempFilePath property');
    }

    // Set the default options
    const options = { folder };

    // Set additional options if provided
    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality; // Corrected the typo
    }

    // Set resource type to auto
    options.resource_type = 'auto';

    try {
        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (error) {
        // Handle and throw errors if upload fails
        throw new Error(`Error uploading to Cloudinary: ${error.message}`);
    }
};
