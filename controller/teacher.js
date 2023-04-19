const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const wrap = require("word-wrap");

let Template = require("../model/template");

let genTemp = require("../config/canvas");

module.exports.allTemplates = (req, res) => {
  let query = {};
  Template.allTemplates(query, (err, result) => {
    if (err) return res.json({ status: false, error: err });
    else return res.json({ status: true, response: result });
  });
};

module.exports.generateTemplate = async (req, res) => {
  // Get the selected template from the request body
  const user_data = req.body;

  // function calling
  try {
    await genTemp.canva(user_data);
    return res.json({
      status: true,
      response: "Template Generated Succesfully",
    });
  } catch (error) {
    return res.json({
      status: false,
      response: "Template not Generated Succesfully",
    });
  }
};
