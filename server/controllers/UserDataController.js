
const Data = require( "../models/UserDataModel.js");

// const updateData = () => {
//   Foo.find({}).exec().then(arr => {
//     foos = arr;
//   });
// };

// updateData();//**********INITIAL UPDATE 

// module.exports.list = function list(req, res) {
//   Foo.find({}).exec().then(arr => {
//     return res.json(arr);
//   });
// };

module.exports.show = function show(req, res) {
  const userName = req.params.userName;
  Data.findOne({userName}).exec().then(data => {
    return res.json(data)
  });
};

module.exports.create = function create(req, res) {
  const newData = new Data(
    req.body
  );
  newData.save().then(savedItem => {
    return res.json(savedItem);
  });
};

// module.exports.update = function update(req, res) {
//   console.log(req.body)
//   const userName = req.params.userName;
//   Data.findOne({userName}).exec()
//   .then(data => {
//     data.news.sources = req.body
//     return data.save();
//   })
//   .then(data => {
//     res.json(data);
//   });
// };

module.exports.update = function update(req, res) { 
  const userName = req.params.userName;
  Data.findOne({userName}, function (err, foundObject) {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      if (!foundObject) {
        res.status(404).send()
      } else {
        if (req.body) {
          foundObject.weather = req.body.weather || foundObject.weather;
          foundObject.sports = req.body.sports || foundObject.sports;
          foundObject.stocks = req.body.stocks || foundObject.stocks;
          foundObject.news = req.body.news || foundObject.news;
          foundObject.movies = req.body.movies || foundObject.movies;
          foundObject.dailyPics = req.body.dailyPics || foundObject.dailyPics;
        }
        foundObject.save(function(err, updateObject) {
          if (err) {
            console.log(err);
            res.status(500).send();
          } else {
            res.send(updateObject)
          }
        })
      }
    }
  })
}




// module.exports.remove = function remove(req, res) {  
//   Foo.remove({/*id*/: req.params.id}).then(function(item){
//     res.send(item);
//   })
// };
  