const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Template model
const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  width: {
    type: Number,
    // required: true,
  },
  height: {
    type: Number,
    // required: true,
  },
  fields: [
    {
      name: {
        type: String,
        required: true,
      },
      position: {
        x: {
          type: Number,
          required: true,
        },
        y: {
          type: Number,
          required: true,
        },
      },
      fontStyle: {
        type: String,
        required: true,
      },
      fontColor: {
        type: String,
        required: true,
      },
      lineHeight: {
        type: Number,
        required: true,
      },
      wrap_width: {
        type: Number,
        required: true,
      },
      upper_height: {
        type: Number,
        required: true,
      },
      left_width: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Template = mongoose.model("Templates", templateSchema);

// create user
module.exports.addDetails = function (details, callback) {
  Template.create(details, callback);
};

// get single user
module.exports.singleUser = (query, callback) => {
  Template.findOne(query, callback);
};

// get all templates
module.exports.allTemplates = (query, callback) => {
  Template.find(query, callback);
};
