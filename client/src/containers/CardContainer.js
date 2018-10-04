import Card from "../components/Card";
import { connect } from "react-redux";
import { loadNewsArticles } from "../actions";

function mapStateToProps(state) {
  return {
    // defaultData: state.defualtData,
    userData: state.userData,
    // userName: state.userName,
    // userDataLoaded: state.userDataLoaded,
    // newsArticles: state.newsArticles,
    newsArticlesLoaded: state.newsArticlesLoaded
  };
}
  
function mapDispatchToProps(dispatch) {
  return {
    // loadUserData: (username) => {
    //   const action = loadUserData(username);
    //   dispatch(action);
    // },
    loadNewsArticles: (newsSources) => {
      const action = loadNewsArticles(newsSources);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Card);