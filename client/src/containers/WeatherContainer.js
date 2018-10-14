import Weather from "../components/Weather";
import { connect } from "react-redux";
import { loadUserData, loadWeather, updateUserData } from "../actions";

function mapStateToProps(state) {
  return {
    defaultData: state.defualtData,
    userData: state.userData,
    userName: state.userName,
    userDataLoaded: state.userDataLoaded,
    currentWeather: state.currentWeather
   
  };
}
  
function mapDispatchToProps(dispatch) {
  return {
    loadUserData: (username) => {
      const action = loadUserData(username);
      dispatch(action);
    },
    loadWeather: (cities) => {
      const action = loadWeather(cities);
      dispatch(action);
    },
    updateUserData: (data, username) => {
      const action = updateUserData(data, username);
      dispatch(action);
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Weather);