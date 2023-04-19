const multer = require("multer");
//  import model
const template = require("../model/template");

// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./adminUpload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports.upload = multer({ storage: storage }).single("image");

// route to handle file uploads
module.exports.upload_temp = function (req, res) {
  const file = req.file;

  if (!file) {
    return res.json({ status: false, message: "Please upload an image file" });
  }
  res.json({
    status: true,
    message: "File uploaded successfully",
    file: file.originalname,
  });
};

// META DATA OF TEMPLATE
module.exports.temp_details = (req, res) => {
  // write the name of template that you used at time of upload.
  const tempDetails = req.body;

  template.addDetails(tempDetails, (err, result) => {
    if (err) return res.json({ status: false, error: err });
    else
      return res.json({
        status: true,
        response: result,
        message: " METADATA for " + tempDetails.name + " updated Successfuly ",
      });
  });
};
