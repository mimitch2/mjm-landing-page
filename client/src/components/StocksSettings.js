import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BasicInput from './BasicInput'
import Button from './Button'
import {sortAlpha} from './Common'

import './StockSettings.scss'


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
    if (input.length > 1) {
      const foundCompanies = this.props.stockSymbols.filter(symb => {
        return symb.name.toLowerCase().includes(input.toLowerCase()) ||
        symb.symbol.toLowerCase().includes(input.toLowerCase())  
  
      })
      this.setState({filteredList: foundCompanies})
    }
  
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
        this.props.loadStocksData(stocks)
        this.props.loadUserData(this.props.userName)
      }, 400);
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
    if (input.length === 0 ) {
      this.setState({filteredList: []})
    }
  }


  filterSources = (input) => {
    // let filteredCompanies = [...this.state.filteredList]
   
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
      <div className=" settings stock-settings invisible" id="stocks-settings">

        <div className="settings-name">
          <i className="far fa-user-cog"></i>
         Stocks Settings
        </div>

        <div className="settings-wrapper">

          <div className="left-list">
            <div className="form-controls">
              <BasicInput 
                sendInput={this.getInput}
                placeholder="Search companies..." 
              />
              <div style={{transform: "translateY(-6px)"}}>
                <Button 
                  height="26px"
                  width="80px"
                  color="white"
                  background={ this.state.input.length > 1 ? "green" : "grey"}
                  label="Search"
                  button="search-stocks"
                  click={this.handleSearchClick}
                  input={this.state.input}
                />
              </div>
            </div>
            <div className="list-header">Stocks List</div>
            <div className ="settings-list-container">
              {this.state.filteredList.map((company, i) => {
                return (
                  <div className="list-item" key={i}>
                    <div className="list-item-name">
                      {`${company.name} - ${company.symbol}`}
                    </div>
                    <i className="fas fa-plus-circle" style={{color: "green", cursor: "pointer"}}
                      onClick={() => this.addCompany(company)}>
                    </i>
                  </div>
                )
              })}
            </div>

          </div>
          <div className="right-list-wrapper">
            <div className="right-list-heading list-heading">
            Your Stocks
            </div>
            <div className="right-list">
              {this.state.userCompanies.map((company, i) => {
                return (
                  <div className="right-list-item" key={i}>
                    <i className="fas fa-minus-circle" style={{color: "red", marginRight:"4px", cursor: "pointer"}}
                      onClick={() => this.removeCompany(company)}>
                    </i>
                    <div className="list-item-name">
                      {`${company.name} - ${company.symbol}`}
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
        <div className="button-group">
          <i className="fas fa-times-circle bottom-icons"
            id="stocks-cancel" 
            style={{color: "red"}}
            onClick={(e) => this.handleSubmit(this.props.type, "cancel", e)}
          ></i>
          <i className="fas fa-check-circle bottom-icons" 
            id="stocks-submit"
            style={{color: "green"}}
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