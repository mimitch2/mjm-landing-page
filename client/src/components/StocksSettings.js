import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BasicInput from './BasicInput'
import Button from './Button'
import cityData from '../cities.json';
import {sortAlpha} from './Common'



const styles = {
  settings: {
    width: "100vw",
    padding: "0px 40px 0px 40px",
    position: "absolute",
    top: 85,
    left: 0
  },
  settingsWrapper: {
    width: "100vw",
    display: "flex",
    justifyContent: "space-around"

  },
  icon: {
    fontSize: "40px",
    color: "grey",
    cursor: "pointer"
  },
  controlsLeft: {
    width: "45%"
  },
  formControls: {
    display: "flex",
    alignItems: "center",
    background: "pink"
  },
  rightList: {
    fontSize: "18px",
    fontWeight: 300,
    height: "300px",
    maxHeight: "300px",
    overflowY: "auto",
    marginTop: "45px",
    width: "45%"
  },
  list: {
    fontSize: "18px",
    fontWeight: 300,
    height: "300px",
    maxHeight: "300px",
    overflowY: "auto"
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "3px 10px 3px 10px"
  },
  rightListItem: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "3px 10px 3px 10px"
  },
  buttons: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomIcons: {
    margin: "0px 12px 0px 12px",
    fontSize: "40px",
    cursor: "pointer",
    height: "60px"
  },
  
}

class StocksSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      // stockList: cityData,
      filteredList: [],
      userCompanies: []
    }
  }


  componentDidMount () {
    this.props.loadStockSymbols()
    this.setState({
      userCompanies: this.props.userData.stocks.companies
    })

  }

  handleSearchClick = () => {
    const { input } = this.state
    const foundCompanies = this.props.stockSymbols.filter(symb => {
      return symb.name.toLowerCase().includes(input.toLowerCase()) ||
      symb.symbol.toLowerCase().includes(input.toLowerCase())  

    })
    this.setState({filteredList: foundCompanies})
  }

  addCompany= (company) => {
    const tempCompanies = [...this.state.userCompanies, company]
    // const sortedUserSources = sortAlpha(tempCompanies)
    const tempArr = this.state.filteredList.filter(item => {
      return item.iexId !== company.iexId
    })
    this.setState({
      userCompanies: tempCompanies,
      filteredList: tempArr
    })
  }

  removeCompany = (company) => {
    const tempCompanies = [...this.state.filteredList, company]
    const sortedList = sortAlpha(tempCompanies)
    const userCompanies = this.state.userCompanies.filter(item => {
      return item.iexId !== company.iexId
    })
    this.setState({
      userCompanies: userCompanies,
      filteredList: sortedList
    })
  }

  handleSubmit = (type, button, e ) => {
    const closeDelay = 150
    const el = document.getElementById(e.target.id)
    this.buttonBounce(el, 40)

    if ( button === "submit") {
      const newData = this.props.userData
      newData.stocks.companies = this.state.userCompanies
      this.props.updateUserData(newData, this.props.userName)
      
      const stockStrings = []
      this.props.userData.stocks.companies.forEach(cmp =>{
        stockStrings.push(cmp.symbol.toLowerCase())
      })
      const stocks = stockStrings.join(',')

      setTimeout(() => {
        this.props.loadStockData(stocks)
        this.props.loadUserData(this.props.userName)
      }, 1000);

    }

    if (button === "cancel") {
      setTimeout(() => {
        this.setState({userCompanies: this.props.userData.stocks.companies})
      }, closeDelay);
    }
    
    setTimeout(() => {
      this.props.settingsClick(type)
    }, closeDelay);

  }
  
  getInput = (input) => {
    this.setState({input: input})
  }


  filterSources = (input) => {
    let filteredCompanies = [...this.state.filteredList]
   
    // if (this.state.input.length > 2) {
    //   filteredCompanies = this.state.companyList.filter(conpany => {
    //     const userIds = this.state.userCompanies.map(usrComp => usrComp.id)
    //     return conpany.name.toLowerCase().includes(this.state.input.toLowerCase()) 
    //     && !userIds.includes(city.id)
    //   })
    // }
    // if (this.state.input.length > 0) {
    //   this.setState({filteredList: sortAlpha(filteredCities)})
    // } else {
    //   this.setState({filteredList: []})
    // }
  }

  buttonBounce = (el, time) => {
    el.style.transition = ".06s"
    el.style.transform = "scale(.95)"
    setTimeout(() => {
      el.style.transition = ".1s"
      el.style.transform = "scale(1)"
    }, time);
  }

  render() {
    // console.log(this.props)
    return (
      <div className="settings invisible" id="stocks-settings" style={styles.settings}>

        <div className="settings-name">{this.props.type}</div>

        <div style={styles.settingsWrapper}>

          <div className="control-left" style={styles.controlsLeft}>
            <div style={styles.formControls}>
              <BasicInput sendInput={this.getInput}
                placeholder="Search companies..." />
              <Button 
                height="26px"
                width="80px"
                color="white"
                background="red"
                label="Search"
                button="search-stocks"
                click={this.handleSearchClick}
              />
            </div>
            
   
            <div className ="select-scroll" style={styles.list}>
              {this.state.filteredList.map((company, i) => {
                return (
                  <div key={i} >
                    <div style={styles.listItem}>
                      <div style={{display: "flex", justifyContent: "flex-start"}}>
                        <div>
                          {`${company.name} - ${company.symbol}`}
                        </div>
                      </div>
                      <i className="fas fa-plus-circle" style={{color: "green", cursor: "pointer"}}
                        onClick={() => this.addCompany(company)}>
                      </i>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
 
          <div style={styles.rightList}>
            {this.state.userCompanies.map((company, i) => {
              return (
                <div key={i}>
                  <div style={styles.rightListItem}>
                  
                    <i className="fas fa-minus-circle" style={{color: "red", marginRight:"4px", cursor: "pointer"}}
                      onClick={() => this.removeCompany(company)}></i>
                    <div>
                      {`${company.name} - ${company.symbol}`}
                    </div>
                  </div>
    
                </div>
              )
            })}
          </div>
        </div>
        <div className="button-group" style={styles.buttons}>
          <i className="fas fa-times-circle"
            id="stocks-cancel" 
            style={{...styles.bottomIcons, color: "red"}}
            onClick={(e) => this.handleSubmit(this.props.type, "cancel", e)}
          ></i>
          <i className="fas fa-check-circle" 
            id="stocks-submit"
            style={{...styles.bottomIcons, color: "green"}}
            onClick={(e) => this.handleSubmit(this.props.type, "submit", e)}></i>
        </div>
      </div> 
    )
  }
}

StocksSettings.propTypes = {
  prop: PropTypes.array,
}

export default StocksSettings;