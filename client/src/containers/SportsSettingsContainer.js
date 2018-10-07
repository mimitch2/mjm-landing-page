import SportsSettings from "../components/SportsSettings";
import { connect } from "react-redux";
import { loadUserData, updateUserData } from "../actions";

function mapStateToProps(state) {
  return {
    userData: state.userData,
    userName: state.userName,
    userDataLoaded: state.userDataLoaded,
    teamsList: state.teamsList
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SportsSettings);