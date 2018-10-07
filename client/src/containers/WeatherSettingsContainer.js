import WeatherSettings from "../components/WeatherSettings";
import { connect } from "react-redux";
import { loadUserData, updateUserData, loadWeather } from "../actions";

function mapStateToProps(state) {
  return {
    defaultData: state.defualtData,
    userData: state.userData,
    userName: state.userName,
    userDataLoaded: state.userDataLoaded,
    newsArticles: state.newsArticles
  };
}
  
function mapDispatchToProps(dispatch) {
  return {
    loadUserData: (username) => {
      const action = loadUserData(username);
      dispatch(action);
    },
    updateUserData: (data, username) => {
      const action = updateUserData(data, username);
      dispatch(action);
    },
    loadWeather: (cities) => {
      const action = loadWeather(cities);
      dispatch(action);
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(WeatherSettings);