const express = require("express");
const router = express.Router();
const template = require("../controller/teacher");


router.post("/allTemplates", template.allTemplates);
router.post("/generateTemplate", template.generateTemplate);

module.exports = router;
