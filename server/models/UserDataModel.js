const mongoose = require("mongoose");


const schema = new mongoose.Schema({
  userName: {
    require: true,
    type: String
  },
  weather: {
    require: true,
    type: Object
  },
  sports: {
    required: true,
    type: Object
  },
  news: {
    require: true,
    type: Object
  },
  stocks: {
    require: true,
    type: Object
  },

  movies: {
    require: true,
    type: Object
  },
  dailyPics: {
    require: true,
    type: Object
  }

});

module.exports = mongoose.model("Data", schema);
