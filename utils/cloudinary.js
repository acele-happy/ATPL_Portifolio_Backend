const cloudinary = require("cloudinary").v2;

let cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
let api_key = process.env.CLOUDiNARY_API_KEY;
let api_secret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: "" + cloud_name,
  api_key: "" + api_key,
  api_secret: "" + api_secret,
});

module.exports = cloudinary;
