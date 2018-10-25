import Card from "../components/Card";
import { connect } from "react-redux";
import { loadNewsArticles, loadWeather, updateUserData, parseTeamInfo } from "../actions";

function mapStateToProps(state) {
  return {
    // defaultData: state.defualtData,
    userData: state.userData,
    marketOpen: state.marketOpen,
    // userDataLoaded: state.userDataLoaded,
    // newsArticles: state.newsArticles,
    newsArticlesLoaded: state.newsArticlesLoaded,
    currentWeather: state.currentWeather

  };
}
  
function mapDispatchToProps(dispatch) {
  return {
    // loadUserData: (username) => {
    //   const action = loadUserData(username);
    //   dispatch(action);
    // },
    updateUserData: (data, username) => {
      const action = updateUserData(data, username);
      dispatch(action);
    },
    loadNewsArticles: (newsSources) => {
      const action = loadNewsArticles(newsSources);
      dispatch(action);
    },
    loadWeather: (cities) => {
      const action = loadWeather(cities);
      dispatch(action);
    },
    setWeather: (weather) => {
      const action = loadWeather(weather);
      dispatch(action);
    },
    parseTeamInfo: (data) => {
      const action = parseTeamInfo(data);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Card);