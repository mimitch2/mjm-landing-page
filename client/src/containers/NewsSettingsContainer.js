import NewsSettings from "../components/NewsSettings";
import { connect } from "react-redux";
import { loadUserData } from "../actions";

function mapStateToProps(state) {
  return {
    defaultData: state.defualtData,
    userData: state.userData,
    userName: state.userName,
    userDataLoaded: state.userDataLoaded
  };
}
  
function mapDispatchToProps(dispatch) {
  return {
    loadUserData: (username) => {
      const action = loadUserData(username);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewsSettings);