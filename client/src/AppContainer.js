
import App from "./App";
import { connect } from "react-redux";
// import {/* loadMyMovieList */} from "./actions";

function mapStateToProps(state) {
  return {
    fullData: state.fullData,
    defaultData: state.defaultData
  };
}
  
// function mapDispatchToProps(dispatch) {
//   return {
//     /* loadMyMovieList */: () => {
//       const action = /* loadMyMovieList() */;
//     dispatch(action);
//     },
//   };
// }

export default connect(mapStateToProps,null)(App);