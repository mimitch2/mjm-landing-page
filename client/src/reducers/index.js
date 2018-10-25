import {combineReducers} from "redux";

function teamsList(state = {}) {
  return state;
}

function citiesList(state = []) {
  return state;
}

function defaultData(state = []) {
  return state;
}

function userName(state = "", action) {
  if (action.type === "SET_USER_NAME") {
    return action.value
  }
  return state;
}

function userData(state = {}, action) {
  if (action.type === "SET_USER_DATA") {
    return action.value
  }
  return state;
}

function userDataLoaded (state = false, action) {
  if (action.type === "USERDATA_LOADED") {
    return action.value
  }
  return state;
}

function newsArticles(state = {}, action) {
  if (action.type === "SET_NEWS_ARTICLES") {
    return action.value
  }
  return state;
}

function newsArticlesLoaded(state = false, action) {
  if (action.type === "NEWSARTICLES_LOADED") {
    return action.value
  }
  return state;
}

function currentWeather(state = [], action) { // FIX *** not sure why this state doesn't update when removing a city
  if (action.type === "SET_WEATHER") {
    const fltrState = state.filter(item => item.id !== action.value.id)
    return [...fltrState, action.value]
  } 
  return state;
}

function sportsData (state = {}, action) {
  if (action.type === "SET_SPORTS_DATA") {
    return {...state, ...action.value}
  }
  return state
}

function sportsDataLoaded (state = false, action) {
  if (action.type === "SPORTS_DATA_LOADED") {
    return action.value
  }
  return state
}

function stocksDataLoaded (state = false, action) {
  if (action.type === "STOCKS_DATA_LOADED") {
    return action.value
  }
  return state
}

function stockSymbols (state = [], action) {
  if (action.type === "SET_STOCK_SYMBOLS") {
    return action.value
  }
  return state
}


const rootReducer = combineReducers({
  defaultData, userName, userData, userDataLoaded, newsArticles, newsArticlesLoaded, currentWeather, teamsList, citiesList, sportsData, sportsDataLoaded, stocksDataLoaded, stockSymbols
});

export default rootReducer;
