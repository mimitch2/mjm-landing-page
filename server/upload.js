

//**************** Database uploader **********************/


const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//**************CHANGE DB LINK BELOW ******************/

mongoose.connect("mongodb://mimitch:Bladerunner80@ds133550.mlab.com:33550/cocktails");
  
const Foo = require("./models/FooModel.js");
const foos = []

foos.forEach((foo) => {
const newFoo = new Foo(foo);
  newFoo.save();
})

for (let index = 0; index < foos.length; index++) {
  const newFoo = new Foo(
    foos[index]
  );
  newFoo.save();
}

//******************* Image scrapper **********************/


// const download = require('image-downloader')
// let count = 0
// function downloadAllImages() {
//   drinks.forEach((drk) => {
//     const options = {
//       url: drk.strDrinkThumb,
//       dest: '/Users/mmitchell/Desktop/CocktailImages'                  
//     }
       
//     async function downloadIMG() {
//       try {
//         const { filename, image } = await download.image(options)
//         count++
//         console.log(filename, "    ", count) // => /path/to/dest/image.jpg 
//       } catch (e) {
//         throw e
//       }
//     }
       
//     downloadIMG()
//   })
// }
// downloadAllImages()