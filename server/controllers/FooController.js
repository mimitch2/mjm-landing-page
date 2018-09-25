
//****************REPLACE ALL OCCURENCES OF "FOO" & "FOOS" **********/

const Foo = require( "../models/FooModel.js");
let foos = []

const updateData = () => {
  Foo.find({}).exec().then(arr => {
    foos = arr;
  });
};

updateData();//**********INITIAL UPDATE 

module.exports.list = function list(req, res) {
  Foo.find({}).exec().then(arr => {
    return res.json(arr);
  });
};

module.exports.show = function show(req, res) {
  const id = req.params.id;
  Foo.find({/*_id*/: id}).exec().then(arr => {
    return res.json(arr[0]);
  });
};

module.exports.create = function create(req, res) {
  updateData();
  const newFoo = new Foo(
    req.body
  );
  newItem.save().then(savedItem => {
    updateData();
    return res.json(savedItem);
  });
};

module.exports.update = function update(req, res) {
  return res.json({/*id*/: req.params.id});
};

module.exports.remove = function remove(req, res) {  
  Foo.remove({/*id*/: req.params.id}).then(function(item){
    res.send(item);
  })
};
  