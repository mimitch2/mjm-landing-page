import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '../containers/CardContainer'
import Weather from '../containers/WeatherContainer'
import WeatherSettings from '../containers/WeatherSettingsContainer'
import Sports from '../containers/SportsContainer'
import SportsSettings from '../containers/SportsSettingsContainer'
import News from '../containers/NewsContainer'
import NewsSettings from '../containers/NewsSettingsContainer'
import Stocks from '../containers/StocksContainer'
import StocksSettings from '../containers/StocksSettingsContainer'

import './MainContent.scss'


class MainContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      news:{},
      showSettings: false,
      settings: "",
      data: {},
      input: "",
      maskedInput: "$ "
    }
  }

  // change = (e) => {
  //   const lastChar = e.target.value.charAt(e.target.value.length -1)
  //   console.log(lastChar)
  //   this.setState({
  //     input: e.target.value
  //   })    

  //   const { input } = this.state
    
  //   if (input.length === 1) {
  //     const num = "$ .0" + input
  //     this.setState({maskedInput: num})
  //   } else if (input.length === 2) {
  //     const num = "$ ." + input
  //     this.setState({maskedInput: num})
  //   } else {
  //     const dec = input.length - 2
  //     const num = "$" + input.substring(0, dec) + "." + input.substring(dec)
  //     this.setState({maskedInput: num})
  //   }    
  // }

  // componentDidUpdate = (prevProps) => {
  //   if (prevProps.loggedIn  !==  this.props.loggedIn && this.props.loggedIn) {
  //     this.setState({data: this.props.userData})
  //   }
  //   //  else if (prevProps.loggedIn  !==  this.props.loggedIn && !this.props.loggedIn) {
  //   //   this.setState({data: this.props.defaultData})
  //   // }
  //   if (prevProps.data.news.sources !== this.props.data.news.sources) {
  //     this.setState({data: this.props.data})
  //   }
  // }

  handleClick = (type) => {
    if (this.props.userName) {
      const components =  document.getElementById('components')
      const settings =  document.getElementById(`${type.toLowerCase()}-settings`)
      setTimeout(() => {
        components.classList.toggle("invisible")
        settings.classList.toggle("invisible")
     
      }, 300);

      setTimeout(() => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }, 800);
  
      this.setState({
        showSettings: !this.state.showSettings,
        settings: type
      })
    } else {
      alert("you need to sign in!")
    }
  }

  render() {
    console.log(this.props.userData)
    if (this.props.userDataLoaded) {
      const { news } = this.props.userData
      return (
 
        <div className="main-content"
          // style={styles.root} 
        >

          {/* <input 
            type="text"
            value = { this.state.input }
            onChange={this.change}
            style={{marginTop: "100px"}}
          /> */}


          <div className="components" id="components">

            <Card heading="NEWS" 
              gridColumn="span 2" gridRow="span 4" height= {600}
              settingsClick={this.handleClick}
              options = {news.sources}>

              <News />

            </Card>
            <Card heading="WEATHER" //!!!!!!!!!!!!!!!
              gridColumn="span 1" gridRow="span 2" height= {300} 
              settingsClick={this.handleClick}>

              <Weather />

            </Card>
            <Card heading="SPORTS" //!!!!!!!!!!!!!!!
              gridColumn="span 1" gridRow="span 2" height= {300}
              settingsClick={this.handleClick}>

              <Sports />

            </Card>
            <Card heading="STOCKS" //!!!!!!!!!!!!!!!
              gridColumn="span 1" gridRow="span 2" height= {300}
              settingsClick={this.handleClick}
              message="The market is ">

              <Stocks />

            </Card>
          </div>

          <div className="settings-wrapper">
            <NewsSettings type={this.state.settings} settingsClick={this.handleClick} />
            <SportsSettings type={this.state.settings} settingsClick={this.handleClick} />
            <StocksSettings type={this.state.settings} settingsClick={this.handleClick} />
            <WeatherSettings type={this.state.settings} settingsClick={this.handleClick} />
          </div>
     
        </div>
      )
    } else {
      return(  
        <div className="loading" >
          <i className="fal fa-sync spin-sync"></i>
        </div>
      )
    }
  }
}

MainContent.propTypes = {
  data: PropTypes.object,
}

export default MainContent;