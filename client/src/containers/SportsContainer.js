import Sports from "../components/Sports";
import { connect } from "react-redux";
// import { loadUserData, loadNewsArticles } from "../actions";

function mapStateToProps(state) {
  return {
    defaultData: state.defualtData,
    userData: state.userData,
    userName: state.userName,
    userDataLoaded: state.userDataLoaded,
  };
}
  
// function mapDispatchToProps(dispatch) {
//   return {
//     loadUserData: (username) => {
//       const action = loadUserData(username);
//       dispatch(action);
//     },
//     loadNewsArticles: (newsSources) => {
//       const action = loadNewsArticles(newsSources);
//       dispatch(action);
//     }
//   }
// }

export default connect(mapStateToProps,null)(Sports);