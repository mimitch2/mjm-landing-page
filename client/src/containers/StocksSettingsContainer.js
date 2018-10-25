import StocksSettings from "../components/StocksSettings";
import { connect } from "react-redux";
import { loadStockSymbols, loadUserData, updateUserData, loadStockData} from "../actions";

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
    loadStockData: (symbols) => {
      const action = loadStockData(symbols);
      dispatch(action);
    },
    

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StocksSettings);