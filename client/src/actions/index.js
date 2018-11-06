
const sportsAuth = {
  type: "GET",
  headers: {"Authorization": "Basic " + btoa(process.env.REACT_APP_SPORTS)}
} 
const weatherAuth = process.env.REACT_APP_WEATHER
const newsAuth = process.env.REACT_APP_NEWS
// const hueAuth = process.env.REACT_APP_HUE


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
      console.log(error)
    }
  }
}

export function loadNewsArticles(newsSources) {
  return async function (dispatch) {
    try {
      const getNews = await fetch(`https://newsapi.org/v2/top-headlines?pageSize=60&sources=${newsSources}&apiKey=${newsAuth}`)
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
        const getWeather = await fetch(`https://api.darksky.net/forecast/${weatherAuth}/${city.lat},${city.long}`)
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

export function parseTeamInfo (data) {
  return function (dispatch) {
    const sportsObj = {teams: [], standings: {}}
    
    data.forEach(team =>{
      sportsObj.teams.push({info: team})
      if (!sportsObj.standings.hasOwnProperty(team.strLeague)) {
        sportsObj.standings = {...sportsObj.standings, [team.strLeague]: {}}
      }
    }) 
    dispatch(loadSportsData(sportsObj))
  }
}


export function loadSportsData (sportsObj) {
  return async function (dispatch) {
    try {
      for (const league in sportsObj.standings) {
        const getStandings = await fetch(`https://api.mysportsfeeds.com/v2.0/pull/${league}/2018-2019-regular/standings.json`, sportsAuth)
        const result = await getStandings.json()
        sportsObj.standings[league] = result
      }
     
      for (let i = 0; i < sportsObj.teams.length; i++) {
        const team = sportsObj.teams[i]
        const getStats = fetch(`https://api.mysportsfeeds.com/v2.0/pull/${team.info.strLeague}/2018-2019-regular/team_stats_totals.json?team=${team.info.strTeamShort}`, sportsAuth)
        const getGames = fetch(`https://api.mysportsfeeds.com/v2.0/pull/${team.info.strLeague}/2018-2019-regular/games.json?team=${team.info.strTeamShort}`, sportsAuth)
        const res = await Promise.all([getStats, getGames])
        const dataArr = res.map(r => r.json())
        const [stats, games] = await Promise.all(dataArr)
        team.games = games 
        team.stats = stats 
      }

      dispatch(setSportsData(sportsObj))
      setTimeout(() => {
        dispatch(sportsDataLoaded(true))
      }, 500);
   
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

export function loadStockSymbols() {
  return async function (dispatch) {
    try {
      const getSymbols = await fetch('https://api.iextrading.com/1.0/ref-data/symbols')
      const symbols = await getSymbols.json()
      
      dispatch(setStockSymbols(symbols))
    } catch (error) {
      console.log(error)
    }
  }
}

export function setStockSymbols(symbols) {
  return {
    type: "SET_STOCK_SYMBOLS",
    value: symbols
  };
}

export function loadStocksData(symbols) {
  return async function (dispatch) {
    try {
      const stockData = await fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote,news,chart&range=1m&last=5`)
      const stocks = await stockData.json()
      const stocksArr = Object.values(stocks)
      
      dispatch(stocksData(stocksArr))
      setTimeout(() => {
        dispatch(stocksDataLoaded(true))
      }, 300);
      return stocks 
    } catch (error) {
      console.log(error)
    }
  }
}

export function stocksData(stocks) {
  return {
    type: "STOCKS_DATA",
    value: stocks
  };
}

export function stocksDataLoaded(bool) {
  return {
    type: "STOCKS_DATA_LOADED",
    value: bool
  };
}


export function isMarketOpen(bool) {
  return {
    type: "MARKET_OPEN",
    value: bool
  };
}


// https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,nflx,amzn&types=quote,news,chart&range=1m&last=5

//https://api.iextrading.com/1.0/ref-data/symbols



// export function showUser(id) {
//   return function (dispatch) {
//     fetch("/user/" + id).then((response) => {
//       return response.json();
//     }).then(() => {
//       dispatch(loadUsers());
//     });
//   };
// }





      

