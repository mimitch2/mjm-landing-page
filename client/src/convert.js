'use strict';
// const excelToJson = require('convert-excel-to-json');
var fs = require('fs');
var fetch = require('node-fetch');

 




// convertExcel('worldcities.xlsx', 'Users/mmitchell/Desktop/cities.json', options, (err, data) => { err? console.log(`JSON conversion failure: ${err}`) : console.log('done')} )


// async function runFunctions(){
//   const result = await excelToJson({
//     sourceFile: 'worldcities.xlsx',
//     header:{
//       // Is the number of rows that will be skipped and will not be present at our result object. Counting from top to bottom
//       rows: 1,
//       columnToKey: {
//         A: 'city',
//         B: 'cityAsci',
//         C: 'lat',
//         D: 'long',
//         E: 'country',
//         F: 'iso2',
//         G: 'iso3',
//         H: 'region',
//         I: 'capital',
//         J: 'population',
//         K: 'id'
//       }
//     },

//   });

// const json =  JSON.stringify(result)

async function getTeams () {
  const teams = await fetch("https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=MLB")
  const json = await teams.json() 
  const ready = await JSON.stringify(json)
  setTimeout(() => {
    fs.writeFile("getteams.json",ready, function(err) {
      if(err) {
        return console.log(err);
      }
      
      console.log("The file was saved!");
    }); 
  }, 3000);
}

 



  
  


getTeams()


