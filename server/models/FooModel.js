const mongoose = require("mongoose");

//******** REPLACE ITEMS AS APPRIPRIATE *********/

const schema = new mongoose.Schema({
  idDrink: {
    require: true,
    type: String,
  },
  strDrink: {
    required: true,
    type: Number
  },
  strVideo: {
    require: false,
    type: String
  },
  strCategory: {
    require: false,
    type: String
  }
});

module.exports = mongoose.model("Foo", schema);
