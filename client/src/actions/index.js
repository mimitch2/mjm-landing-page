
import keys from "../config.js"

const auth = {
  type: "GET",
  headers: {"Authorization": "Basic " + btoa(keys.sportsKey)}
} 


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
//     loadSportsStandings(league)
//   }
// }


export function parseTeamInfo (data) {
  return function (dispatch) {
    const teamObj = {}
    data.forEach(team =>{
      const teamLeg = team.strLeague
      if (!(teamLeg in teamObj)) {
        teamObj[teamLeg] = {}
      } 
      teamObj[teamLeg] = {[team.strTeamShort]:{}, ...teamObj[teamLeg]}
    }) 
    dispatch(loadSportsData(teamObj))
  }
}


export function loadSportsData (teamObj) {
  return async function (dispatch) {
    dispatch(sportsDataLoaded(false))
    try {
      for (const league in teamObj) {
        const getStandings = await fetch(`https://api.mysportsfeeds.com/v2.0/pull/${league}/2018-2019-regular/standings.json`, auth)
        const result = await getStandings.json()
        teamObj[league].standings = result
      }
      const newObj =  teamObj
      for (const league in newObj) {
        for (const teamcode in newObj[league]) {
          if (teamcode !== "standings") {
            const getStats = fetch(`https://api.mysportsfeeds.com/v2.0/pull/${league}/2018-2019-regular/team_stats_totals.json?team=${teamcode}`, auth)
            const getGames = fetch(`https://api.mysportsfeeds.com/v2.0/pull/${league}/2018-2019-regular/games.json?team=${teamcode}`, auth)
            const res = await Promise.all([getStats, getGames])
            const dataArr = res.map(r => r.json())
            const [stats, games] = await Promise.all(dataArr)
            newObj[league][teamcode].stats = stats
            newObj[league][teamcode].games = games
          }
        }
      }
      dispatch(setSportsData(teamObj))
      setTimeout(() => {
        dispatch(sportsDataLoaded(true))
      }, 300);
   
     
    } catch (error) {
      console.log(error)
    }
  }
}


export function setSportsData(sportsData) {
  return {
    type: "SET_SPORTS_DATA",
    value: sportsData
  };
}

export function sportsDataLoaded(bool) {
  return {
    type: "SPORTS_DATA_LOADED",
    value: bool
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





      

