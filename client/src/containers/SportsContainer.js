import Sports from "../components/Sports";
import { connect } from "react-redux";
import { loadSportsData, parseTeamInfo } from "../actions";

function mapStateToProps(state) {
  return {
    defaultData: state.defaultData,
    userData: state.userData,
    userName: state.userName,
    userDataLoaded: state.userDataLoaded,
    sportsData: state.sportsData,
    sportsDataLoaded: state.sportsDataLoaded,
    teamsList: state.teamsList
  };
}
  
function mapDispatchToProps(dispatch) {
  return {
    loadSportsData: (teamObj) => {
      const action = loadSportsData(teamObj);
      dispatch(action);
    },
    parseTeamInfo: (data) => {
      const action = parseTeamInfo(data);
      dispatch(action);
    },
    // sportsDataLoaded: (bool) => {
    //   const action = sportsDataLoaded(bool);
    //   dispatch(action);
    // },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sports);