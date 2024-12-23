
const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = { folder }; // Specify the folder for storing the image
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }


  options.resource_type = "auto";

  // Upload the file to Cloudinary
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
