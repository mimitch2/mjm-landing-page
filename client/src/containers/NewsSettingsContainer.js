import NewsSettings from "../components/NewsSettings";
import { connect } from "react-redux";
import { loadUserData } from "../actions";

function mapStateToProps(state) {
  return {
    userData: state.userData,
    userName: state.userName,
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