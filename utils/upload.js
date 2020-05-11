const path = require("path");
const uploadPath = path.join(__dirname, "../tests/fixtures");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const allows = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    if (!allows.includes(file.mimetype)) {
      const err = "File not allowed";
      return cb(err, undefined);
    }

    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("fileUpload"); // field name from client
module.exports = upload;
