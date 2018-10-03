
export function loadUserData(username) {
  return  function (dispatch) {
    fetch(`api/data/${username}`).then(resp => {
      return resp.json()
    }).then((result) => {
      dispatch(setUserData(result));
      dispatch(userDataLoaded(true));
    })
  };
}

export function setUserData(data) {
  return {
    type: "SET_USER_DATA",
    value: data
  };
}
  
      
export function userDataLoaded(result) {
  return {
    type: "USERDATA_LOADED",
    value: result
  };
}

export function updateUserData(data, username) {
  return  function (dispatch) {
    fetch(`api/data/${username}`,{
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    }).then(resp => {
      return resp.json()
    }).then((result) => {
      dispatch(setUserData(result));
      // dispatch(userDataLoaded(true));
    })
  };
}


export function loadNewsArticles(newsSources) {
  console.log("load articles")
  return function (dispatch) {
    fetch(`https://newsapi.org/v2/top-headlines?sources=${newsSources}&apiKey=cac7992187f24fc493e8b132bee398bb`).then(resp => {
      return resp.json()
    }).then((result) => {
      dispatch(setNewsArticles(result));
      dispatch(newsArticlesLoaded(true));
    })
  };
}

export function setNewsArticles(articles) {
  console.log("set articles")
  return {
    type: "SET_NEWS_ARTICLES",
    value: articles
  };
}

export function newsArticlesLoaded(result) {
  return {
    type: "NEWSARTICLES_LOADED",
    value: result
  };
}







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


export function setUserName(name) {
  return {
    type: "SET_USER_NAME",
    value: name
  };

}


      

