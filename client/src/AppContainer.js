
import App from "./App";
import { connect } from "react-redux";
import { setUserName, setUserData, loadUserData } from "./actions";

function mapStateToProps(state) {
  return {
    userName: state.userName,
    defaultData: state.defaultData,
    userData: state.userData,
    userDataLoaded: state.userDataLoaded
  };
}
  
function mapDispatchToProps(dispatch) {
  return {
    setUserName: (name) => {
      const action = setUserName(name);
      dispatch(action);
    },
    setUserData: (data) => {
      const action = setUserData(data);
      dispatch(action);
    },
    loadUserData: (username) => {
      const action = loadUserData(username);
      dispatch(action);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);