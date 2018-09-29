import {combineReducers} from "redux";

// function fullData(state = [], action) {
//   if (action.type === "FULLDATA_LOADED") {
//     return action.value;
//   }
//   return state;
// }

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

// function favorites(state = [], action) {
//   if (action.type === "FAVORITES_LOADED") {
//     return action.value;
//   }
//   return state;
// }



const rootReducer = combineReducers({
  defaultData, userName, userData
});

export default rootReducer;
