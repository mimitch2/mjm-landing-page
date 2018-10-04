export function setUserName(name) {
  return {
    type: "SET_USER_NAME",
    value: name
  };

}

export function loadUserData(username) {
  return  async function (dispatch) {
    try {
      const fetchData = await fetch(`api/data/${username}`)
      const userData = await fetchData.json()
      dispatch(setUserData(userData));
      dispatch(userDataLoaded(true));
      return userData
    } catch (error) {
      console.log(error)
    }
  }
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
  return async function (dispatch, res) {
    try {
      const putUserData = await fetch(`api/data/${username}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
      const name = await putUserData.json()
      dispatch(setUserData(name));
      return name
      // dispatch(userDataLoaded(true));
    } catch (error) {
      error.send("Something went wrong loading news articles, please try again")
      console.log(error)
    }
  }
}

export function loadNewsArticles(newsSources) {
  return async function (dispatch) {
    try {
      const getNews = await fetch(`https://newsapi.org/v2/top-headlines?pageSize=60&sources=${newsSources}&apiKey=cac7992187f24fc493e8b132bee398bb`)
      const news = await getNews.json()
      dispatch(setNewsArticles(news));
      dispatch(newsArticlesLoaded(true));
      return news
    } catch (error) {
      console.log(`load new error = ${error}`)
    }
  }
}

export function setNewsArticles(articles) {
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








// export function showUser(id) {
//   return function (dispatch) {
//     fetch("/user/" + id).then((response) => {
//       return response.json();
//     }).then(() => {
//       dispatch(loadUsers());
//     });
//   };
// }





      

