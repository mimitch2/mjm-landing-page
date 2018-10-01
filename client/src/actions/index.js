
// export function loadFullData() {
//   return function (dispatch) {
//     fetch("https://mjm-cocktail-app.herokuapp.com/getAllData").then( (response) => {
//       return response.json();
//     }).then(
//       (result) => {
//         dispatch(fullDataLoaded(result));
//       });
//   };
// }
      
// export function fullDataLoaded(result) {
//   return {
//     type: "FULLDATA_LOADED",
//     value: result
//   };
// }


// export function loadFavorites() {
//   return function (dispatch) {
//     fetch("https://mjm-cocktail-app.herokuapp.com/favorites").then( (response) => {
//       return response.json();
//     }).then((favorites) => {
//       dispatch(favoritesLoaded(favorites));
//     });
//   };
// }
      
// export function favoritesLoaded(favorites) {
//   return {
//     type: "FAVORITES_LOADED",
//     value: favorites
//   };
// }

// export function showUser(id) {
//   return function (dispatch) {
//     fetch("/user/" + id).then((response) => {
//       return response.json();
//     }).then(() => {
//       dispatch(loadUsers());
//     });
//   };
// }

export function setUserData(data) {
  console.log("setdata")
  return {
    type: "SET_USER_DATA",
    value: data
  };

}
  
export function setUserName(name) {
  return {
    type: "SET_USER_NAME",
    value: name
  };

}


      

