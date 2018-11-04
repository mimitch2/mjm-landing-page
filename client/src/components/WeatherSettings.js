import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import BasicInput from './BasicInput'
import cityData from '../cities.json';
import {sortAlpha} from './Common'

import './WeatherSettings.scss'


class WeatherSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      cityList: cityData,
      filteredList: [],
      userCities: []
    }
  }

  componentDidMount () {
    this.setState({
      userCities: this.props.userData.weather.cities
    })
  }

  addCity = (city) => {
    const tempCities = [...this.state.userCities, city]
    const tempArr = this.state.filteredList.filter(item => {
      return item.id !== city.id
    })
    this.setState({
      userCities: tempCities,
      filteredList: tempArr
    })
  }

  removeCity = (city) => {
    const tempCities = [...this.state.filteredList, city]
    const sortedList = sortAlpha(tempCities)
    const userCities = this.state.userCities.filter(item => {
      return item.id !== city.id
    })
    this.setState({
      userCities: userCities,
      filteredList: sortedList
    })
  }

  handleSubmit = (type, button, e ) => {
    const closeDelay = 150
    const el = document.getElementById(e.target.id)
    this.buttonBounce(el, 40)

    if ( button === "submit") {
      const newData = this.props.userData
      newData.weather.cities = this.state.userCities
      this.props.updateUserData(newData, this.props.userName)
      setTimeout(() => {
        this.props.userData.weather.cities.forEach(city =>{
          this.props.loadWeather(city)
        })
        this.props.loadUserData(this.props.userName)
      }, 1000);
    }
    if (button === "cancel") {
      setTimeout(() => {
        this.setState({userCities: this.props.userData.weather.cities})
      }, closeDelay);
    }
    setTimeout(() => {
      this.props.settingsClick(type)
    }, closeDelay);
  }



  filterSources = (input) => {
    let filteredCities = [...this.state.filteredList]
    this.setState({input: input})
    if (this.state.input.length > 2) {
      filteredCities = this.state.cityList.filter(city => {
        const userIds = this.state.userCities.map(usrCit => usrCit.id)
        return city.name.toLowerCase().includes(this.state.input.toLowerCase()) 
        && !userIds.includes(city.id)
      })
    }
    if (this.state.input.length > 0) {
      this.setState({filteredList: sortAlpha(filteredCities)})
    } else {
      this.setState({filteredList: []})
    }
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
    return (
      <div className="settings weather-settings invisible" id="weather-settings">

        <div className="settings-name">
          <i className="far fa-user-cog"></i>
        Weather Settings
        </div>

        <div className="settings-wrapper">

          <div className="left-list">

            <BasicInput sendInput={this.filterSources}
              placeholder="Search cities..." />
            <div className="list-header">City List</div>
            <div className ="settings-list-container">
              {this.state.filteredList.map((city, i) => {
                return (
                  <div className="list-item" key={i}>
                    
                    <div className="list-item-name">
                      {`${city.name} - ${city.region} - ${city.country}`}
                    </div>
                    <i className="fas fa-plus-circle" style={{color: "green", cursor: "pointer"}}
                      onClick={() => this.addCity(city)}>
                    </i>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="right-list-wrapper">
            <div className="right-list-heading list-heading">
            Your Cities
            </div>
            <div className="right-list">
              {this.state.userCities.map((city, i) => {
                return (
                  <div className="right-list-item" key={i} >
                    <i className="fas fa-minus-circle" style={{color: "red", marginRight:"4px", cursor: "pointer"}}
                      onClick={() => this.removeCity(city)}></i>
                    <div className="right-list-item-name">
                      {`${city.name} - ${city.region} - ${city.country}`}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="button-group">
          <i className="fas fa-times-circle bottom-icons"
            id="weather-cancel" 
            style={{color: "red"}}
            onClick={(e) => this.handleSubmit(this.props.type, "cancel", e)}
          ></i>
          <i className="fas fa-check-circle bottom-icons" 
            id="weather-submit"
            style={{color: "green"}}
            onClick={(e) => this.handleSubmit(this.props.type, "submit", e)}></i>
        </div>
      </div> 
    )
  }
}

// WeatherSettings.propTypes = {
//   prop: PropTypes.array,
// }

export default WeatherSettings;