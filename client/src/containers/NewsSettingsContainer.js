import NewsSettings from "../components/NewsSettings";
import { connect } from "react-redux";
import { loadUserData, updateUserData, loadNewsArticles } from "../actions";

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
    loadNewsArticles: (newsSources) => {
      const action = loadNewsArticles(newsSources);
      dispatch(action);
    }

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewsSettings);