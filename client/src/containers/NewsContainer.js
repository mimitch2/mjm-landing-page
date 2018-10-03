import News from "../components/News";
import { connect } from "react-redux";
import { loadUserData, fetchNews } from "../actions";

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
    },
    fetchNews: (newsSources) => {
      const action = fetchNews(newsSources);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(News);