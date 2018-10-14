
import keys from "../config.js"
 
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
    } catch (error) {
      error.send("Something went wrong loading news articles, please try again")
      console.log(error)
    }
  }
}

export function loadNewsArticles(newsSources) {
  return async function (dispatch) {
    try {
      const getNews = await fetch(`https://newsapi.org/v2/top-headlines?pageSize=60&sources=${newsSources}&apiKey=${keys.newsKey}`)
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

//https://cors-anywhere.herokuapp.com/

export function loadWeather(city) {
  return async function (dispatch) {
    try {
      if (city) {
        const getWeather = await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${keys.weatherKey}/${city.lat},${city.long}`)
        const weather = await getWeather.json()
        const temp = weather
        temp.id = city.id
        temp.name = city.name
        dispatch(setWeather(temp));
        return temp
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export function setWeather(weather) {
  return {
    type: "SET_WEATHER",
    value: weather
  };
}

// export function loadAllSports (league, teamcode) {
//   return async function (dispatch) {
//     loadSportsStats(league)
//   }
// }

// export function loadSportsStats(league) {
//   return async function (dispatch) {
//     try {
//       if (league) {
//         const getStats = await fetch(`https://api.mysportsfeeds.com/v2.0/pull/${league}/2018-2019-regular/standings.json`,
//           {
//             type: "GET",
//             headers: {
//               "Authorization": "Basic " + btoa(keys.sportsKey)
//             }
//           })
//         const response = await getStats.json()
//         // dispatch(setSportsData(response));
//         return response
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

// export function loadSportsGames(league, teamcode) {
//   return async function (dispatch) {
//     try {
//       if (league) {
//         const getGames = await fetch(`https://api.mysportsfeeds.com/v2.0/pull/${league}/2018-2019-regular/games.json?team=${teamcode}`,
//           {
//             type: "GET",
//             headers: {
//               "Authorization": "Basic " + btoa(keys.sportsKey)
//             }
//           })
//         const response = await getGames.json()
//         response.team = teamcode
//         const games  = await response
//         // dispatch(setSportsData(response));
//         return games
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

// const counter = 0

// export function setSportsData(sportsData) {
//   // if (type === "games" && counter  === count){
//   //   counter++
//   return {
//     type: "SET_SPORTS_DATA",
//     value: sportsData
//   };
//   // } 
// }

// export function sportsDataLoaded(result) {
//   return {
//     type: "SPORTS_DATA_LOADED",
//     value: result
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





      

