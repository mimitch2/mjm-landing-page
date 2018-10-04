import {combineReducers} from "redux";


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






// function favorites(state = [], action) {
//   if (action.type === "FAVORITES_LOADED") {
//     return action.value;
//   }
//   return state;
// }



const rootReducer = combineReducers({
  defaultData, userName, userData, userDataLoaded, newsArticles, newsArticlesLoaded
});

export default rootReducer;
