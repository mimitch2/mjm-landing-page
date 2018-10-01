import SportsSettings from "../components/SportsSettings";
import { connect } from "react-redux";
// import {/* loadMyMovieList */} from "./actions";

function mapStateToProps(state) {
  return {
    userData: state.userData,
    userName: state.userName,
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

export default connect(mapStateToProps,null)(SportsSettings);