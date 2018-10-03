import MainContent from "../components/MainContent";
import { connect } from "react-redux";
// import {/* loadMyMovieList */} from "./actions";

function mapStateToProps(state) {
  return {
    defaultData: state.defaultData,
    userData: state.userData,
    userName: state.userName,
    userDataLoaded: state.userDataLoaded

  };
}
  
// function mapDispatchToProps(dispatch) {
//   return {
//     /* loadMyMovieList */: () => {
//       const action = /* loadMyMovieList() */;
//       dispatch(action);
//     },
//   };
// }

export default connect(mapStateToProps,null)(MainContent);