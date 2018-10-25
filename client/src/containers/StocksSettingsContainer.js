import StocksSettings from "../components/StocksSettings";
import { connect } from "react-redux";
import { loadStockSymbols, loadUserData, updateUserData, loadStocksData} from "../actions";

function mapStateToProps(state) {
  return {
    userData: state.userData,
    userName: state.userName,
    stockSymbols: state.stockSymbols
  };
}
  
function mapDispatchToProps(dispatch) {
  return {
    loadStockSymbols: () => {
      const action = loadStockSymbols();
      dispatch(action);
    },
    loadUserData: (username) => {
      const action = loadUserData(username);
      dispatch(action);
    },
    updateUserData: (data, username) => {
      const action = updateUserData(data, username);
      dispatch(action);
    },
    loadStocksData: (symbols) => {
      const action = loadStocksData(symbols);
      dispatch(action);
    },
    

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StocksSettings);