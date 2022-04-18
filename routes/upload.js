// const router = require("express").Router();
// const cloudinary = require("cloudinary");
// const dotenv = require("dotenv");
// dotenv.config()
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET
// });

// // upload image
// router.post("/upload", (req, res) => {
//   try {
//     console.log(req.files);
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).json({ msg: "Không có file được upload" });
//     }
//     const file = req.files.file;
//     if (file.size > 2048 * 2048) {
//       // if image > 4MB
//       return res.status(400).json({
//         msg: "Vui lòng upload kích thước nhỏ hơn 4MB",
//       });
//     }
//     if (
//       file.mimetype !== "image/jpeg" &&
//       file.mimetype !== "image/jpg" &&
//       file.mimetype !== "image/png"
//     ) {
//       return res.status(400).json({
//         msg: "Vui lòng upload file jpg, jpeg hoặc png",
//       });
//     }
//     cloudinary.v2.uploader.upload(
//       file.tempFilePath,
//       {
//         folder: "SocialApp",
//       },
//       async (err, result) => {
//         if (err) throw err;
//         return res.json({ result: result });
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       msg: "Upload thất bại",
//     });
//   }
// });
// module.exports = router;
