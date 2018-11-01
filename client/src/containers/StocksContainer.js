import Stocks from "../components/Stocks";
import { connect } from "react-redux";
import { loadStocksData, isMarketOpen } from "../actions";

function mapStateToProps(state) {
  return {
    defaultData: state.defaultData,
    userData: state.userData,
    userName: state.userName,
    userDataLoaded: state.userDataLoaded,
    stocksData: state.stocksData,
    stocksDataLoaded: state.stocksDataLoaded,

  };
}
  
function mapDispatchToProps(dispatch) {
  return {
    loadStocksData: (symbols) => {
      const action = loadStocksData(symbols);
      dispatch(action);
    },
    isMarketOpen: (bool) => {
      const action = isMarketOpen(bool);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stocks);