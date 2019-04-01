import state from '../state.js';

const sportsAuth = {
  type: 'GET',
  headers: { Authorization: 'Basic ' + btoa(process.env.REACT_APP_SPORTS) }
};
const weatherAuth = process.env.REACT_APP_WEATHER;
const newsAuth = process.env.REACT_APP_NEWS;

export const setUserName = (name) => {
  return {
    type: 'SET_USER_NAME',
    value: name
  };
}

export const loadUserData = (username) => {
  return async (dispatch) => {
    if (username) {
      try {
        const fetchData = await fetch(`api/data/${username}`);
        const userData = await fetchData.json();
        dispatch(setUserData(userData));
        dispatch(userDataLoaded(true));
        return userData;
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(setUserData(state.defaultData));
      dispatch(userDataLoaded(true));
      return state.defaultData;
    }
  };
}

export const setUserData = (data) => {
  return {
    type: 'SET_USER_DATA',
    value: data
  };
}

export const userDataLoaded = (result) => {
  return {
    type: 'USERDATA_LOADED',
    value: result
  };
}

export const updateUserData = (data, username) => {
  return async (dispatch) => {
    try {
      const putUserData = await fetch(`api/data/${username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const name = await putUserData.json();
      dispatch(setUserData(name));
      return name;
    } catch (error) {
      console.log(error);
    }
  };
}

export const loadNewsArticles = (newsSources) => {
  return async (dispatch) => {
    try {
      const getNews = await fetch(
        `https://newsapi.org/v2/top-headlines?pageSize=60&sources=${newsSources}&apiKey=${newsAuth}`
      );
      const news = await getNews.json();
      dispatch(setNewsArticles(news));
      dispatch(newsArticlesLoaded(true));
      return news;
    } catch (error) {
      console.log(`load new error = ${error}`);
    }
  };
}

export const setNewsArticles = (articles) => {
  return {
    type: 'SET_NEWS_ARTICLES',
    value: articles
  };
}

export const newsArticlesLoaded = (result) => {
  return {
    type: 'NEWSARTICLES_LOADED',
    value: result
  };
}

//https://cors-anywhere.herokuapp.com/

export const loadWeather = (city) => {
  return async (dispatch) => {
    try {
      if (city) {
        const getWeather = await fetch(
          `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${weatherAuth}/${city.lat},${
            city.long
          }`
        );
        const weather = await getWeather.json();
        const temp = weather;
        temp.id = city.id;
        temp.name = city.name;
        dispatch(setWeather(temp));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export const setWeather = (weather) => {
  return {
    type: 'SET_WEATHER',
    value: weather
  };
}

export const parseTeamInfo = (data) => {
  return (dispatch) => {
    const sportsObj = { teams: [], standings: {} };
    data.forEach(team => {
      sportsObj.teams.push({ info: team });
      if (!sportsObj.standings.hasOwnProperty(team.strLeague)) {
        sportsObj.standings = { ...sportsObj.standings, [team.strLeague]: {} };
      }
    });
    dispatch(loadSportsData(sportsObj));
  };
}

export const loadSportsData = (sportsObj) => {
  return async (dispatch) => {
    try {
      for (const league in sportsObj.standings) {
        const getStandings = await fetch(
          `https://api.mysportsfeeds.com/v2.0/pull/${league}/2018-2019-regular/standings.json`,
          sportsAuth
        );
        const result = await getStandings.json();
        sportsObj.standings[league] = result;
      }

      for (let i = 0; i < sportsObj.teams.length; i++) {
        const team = sportsObj.teams[i];
        const getStats = await fetch(
          `https://api.mysportsfeeds.com/v2.0/pull/${
            team.info.strLeague
          }/2018-2019-regular/team_stats_totals.json?team=${
            team.info.strTeamShort
          }`,
          sportsAuth
        );
        const getGames = await fetch(
          `https://api.mysportsfeeds.com/v2.0/pull/${
            team.info.strLeague
          }/2018-2019-regular/games.json?team=${team.info.strTeamShort}`,
          sportsAuth
        );
        const res = await Promise.all([getStats, getGames]);
        const dataArr = res.map(r => r.json());
        const [stats, games] = await Promise.all(dataArr);
        team.games = games;
        team.stats = stats;
      }

      // const team = sportsObj.teams
      // const arrOne = team.map(tm => `https://api.mysportsfeeds.com/v2.0/pull/${tm.info.strLeague}/2018-2019-regular/team_stats_totals.json?team=${tm.info.strTeamShort}`)
      // // const arrTwo = 
      // console.log(arrOne)

      // const all = await Promise.all(team.map(tm => {
      //   return fetch(`https://api.mysportsfeeds.com/v2.0/pull/${tm.info.strLeague}/2018-2019-regular/team_stats_totals.json?team=${tm.info.strTeamShort}`,
      //     sportsAuth
      //   )
      // }))

      // const res = await all
      // const data = res.map(res => res.json())
      // const [newData] = await Promise.all(data)
      // // console.table(newData)














      dispatch(setSportsData(sportsObj));
      dispatch(sportsDataLoaded(true));
    } catch (error) {
      console.log(error);
    }
  };
}

export const setSportsData = (sportsData) => {
  return {
    type: 'SET_SPORTS_DATA',
    value: sportsData
  };
}

export const sportsDataLoaded = (bool) => {
  return {
    type: 'SPORTS_DATA_LOADED',
    value: bool
  };
}

export const loadStockSymbols = () => {
  return async (dispatch) => {
    try {
      const getSymbols = await fetch(
        'https://cors-anywhere.herokuapp.com/https://api.iextrading.com/1.0/ref-data/symbols'
      );
      const symbols = await getSymbols.json();
      dispatch(setStockSymbols(symbols));
    } catch (error) {
      console.log(error);
    }
  };
}

export const setStockSymbols = (symbols) => {
  return {
    type: 'SET_STOCK_SYMBOLS',
    value: symbols
  };
}

export const loadStocksData = (symbols) => {
  return async (dispatch) => {
    try {
      const stockData = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote,news,chart&range=1m&last=5`
      );
      const stocks = await stockData.json();
      const stocksArr = Object.values(stocks);

      dispatch(stocksData(stocksArr));
      setTimeout(() => {
        dispatch(stocksDataLoaded(true));
      }, 300);
      return stocks;
    } catch (error) {
      console.log(error);
    }
  };
}

export const stocksData = (stocks) => {
  return {
    type: 'STOCKS_DATA',
    value: stocks
  };
}

export const stocksDataLoaded = (bool) => {
  return {
    type: 'STOCKS_DATA_LOADED',
    value: bool
  };
}

export const isMarketOpen = (bool) => {
  return {
    type: 'MARKET_OPEN',
    value: bool
  };
}
