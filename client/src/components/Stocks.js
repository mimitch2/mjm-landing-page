import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import Moment from 'react-moment';

const styles ={
  content: {
    display: "flex",
  },
  item: {
    marginLeft: "2px",
    marginRight: "2px"
  },
  tableRows: {
    width: '350px',
  },
  tableHeader: {
    padding: "1px 5px 1px 5px"
  },
  title: {
    width: '350px',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    fontSize: "20px",
    fontWeight: "400"
  },
  stockItem: {
    display: "flex",
    flexDirection: "column",
    borderBottom: "1px solid grey",
    minHeight: "130px",
    padding: "16px 0 0 12px"
  },
  itemLoading: {
    height: "130px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  lineItem: {
    display: "flex",
    justifyContent: "flex-start",
    textAlign: "left"
  },
  time: {
    marginLeft: "2px",
    fontSize: "12px",
    color: "grey",
    display: "flex",
    alignItems: "center",
    justifyContent: "felx-end"
  }
}

class Stocks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // isOpen: true
    }
  }

  componentDidMount = () => {
    const stockStrings = []
    this.props.userData.stocks.companies.forEach(cmp =>{
      stockStrings.push(cmp.symbol.toLowerCase())
    })
    const stocks = stockStrings.join(',')
    this.props.loadStocksData(stocks)
    this.isMarketOpen()
    setInterval(() => {
      this.isMarketOpen()
      this.props.loadStocksData(stocks)
    }, 10000);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.userData !== this.props.userData || prevProps.userName !== this.props.userName){
      // this.props.userData.weather.cities.forEach(city =>{
      //   this.getData(city) 
      // })
    }
    // if (prevProps.currentWeather !== this.props.currentWeather) {
    //   this.setState({weather: this.props.currentWeather})
    // }

  }

  async isMarketOpen() {
    try {
      const getInfo = await fetch('https://api.iextrading.com/1.0/deep/system-event')
      const isOpen = await getInfo.json()
      if (isOpen.systemEvent === "R") {
        this.props.isMarketOpen(true)
      } else if (isOpen.systemEvent !== "R") {
        this.props.isMarketOpen(false)
      } 
    } catch (error) {
      console.log(error)
    }
  
  }


  greenOrRed = (num) => {
    if (num > 0) {
      return "green"
    } else if (num === 0) {
      return "black" 
    }
    return "red"
  }

  formatCurrency = (num) => {
    return (num * 100 / 100).toFixed(2)
  }


  render() {
    if (this.props.stocksDataLoaded) {
      return (
        <div>
          {this.props.stocksData.map(stock => {
            const { companyName, symbol, iexRealtimePrice, 
              change, changePercent, high, low,
              week52High, week52Low } = stock.quote
            return (
              <div key={symbol} style={styles.stockItem}>
                <div style={styles.title}>       
                  {`${symbol} - ${companyName}`} 
                  <span style={{marginLeft: "10px", 
                    color: this.greenOrRed(change), 
                    fontWeight: "400", 
                    fontSize: "24px"}}>
                    {this.formatCurrency(iexRealtimePrice)}
                  </span>
                </div>
                <table style={styles.tableRows}>
                  <tbody>
                    <tr>
                      <th style={styles.tableHeader}>Change</th>
                      <th style={styles.tableHeader}>%Change</th>
                      <th style={styles.tableHeader}>High</th>
                      <th style={styles.tableHeader}>Low</th>
                      <th style={styles.tableHeader}>52wHigh</th>
                      <th style={styles.tableHeader}>52wLow</th>
                    </tr>
                    <tr>
                      <td style={{...styles.tableHeader, color: this.greenOrRed(change)}}>
                        {this.formatCurrency(change)}
                      </td> 
                      <td style={{...styles.tableHeader, color: this.greenOrRed(change)}}>
                        {`${this.formatCurrency(changePercent * 100)}%`}
                      </td> 
                      <td style={styles.tableHeader}>{this.formatCurrency(high)}</td>
                      <td style={styles.tableHeader}>{this.formatCurrency(low)}</td>
                      <td style={styles.tableHeader}>{this.formatCurrency(week52High)}</td>
                      <td style={styles.tableHeader}>{this.formatCurrency(week52Low)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          })}

        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}


// Weather.propTypes = {
//   prop: PropTypes.array,
// }

export default Stocks;