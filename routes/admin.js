const express = require("express");
const router = express.Router();

const template = require("../controller/admin");

router.post("/upload/template", template.upload, template.upload_temp);
router.post("/upload/templatedetails", template.temp_details);

module.exports = router;
