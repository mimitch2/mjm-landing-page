import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BasicInput from './BasicInput'
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
  bottomIcons: {
    margin: "0px 12px 0px 12px",
    fontSize: "40px",
    cursor: "pointer",
    height: "60px"
  },
  
}

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
    const sortedUserSources = sortAlpha(tempCities)
    const tempArr = this.state.filteredList.filter(item => {
      return item.id !== city.id
    })
    this.setState({
      userCities: sortedUserSources,
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
      newData.weather.cities = [...this.state.userCities]
      this.props.updateUserData(newData, this.props.userName)
      setTimeout(() => {
        this.props.loadUserData(this.props.userName)
      }, closeDelay);

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
      <div className="settings invisible" id="weather-settings" style={styles.settings}>

        <div className="settings-name">{this.props.type}</div>

        <div style={styles.settingsWrapper}>

          <div className="control-left" style={styles.controlsLeft}>

            <BasicInput sendInput={this.filterSources}
              placeholder="Search cities..." />
   
            <div style={styles.list}>
              {this.state.filteredList.map((city, i) => {
                return (
                  <div key={i} >
                    <div style={styles.listItem}>
                      <div style={{display: "flex", justifyContent: "flex-start"}}>
                        <div>
                          {`${city.name} - ${city.region} - ${city.country}`}
                        </div>
                      </div>
                      <i className="fas fa-plus-circle" style={{color: "green", cursor: "pointer"}}
                        onClick={() => this.addCity(city)}>
                      </i>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
 
          <div style={styles.rightList}>
            {this.state.userCities.map((city, i) => {
              return (
                <div key={i} >
                  <div style={styles.rightListItem}>
                  
                    <i className="fas fa-minus-circle" style={{color: "red", marginRight:"4px", cursor: "pointer"}}
                      onClick={() => this.removeCity(city)}></i>
                    <div>
                      {`${city.name} - ${city.region} - ${city.country}`}
                    </div>
                  </div>
    
                </div>
              )
            })}
          </div>
        </div>
        <div className="button-group" style={styles.buttons}>
          <i className="fas fa-times-circle"
            id="weather-cancel" 
            style={{...styles.bottomIcons, color: "red"}}
            onClick={(e) => this.handleSubmit(this.props.type, "cancel", e)}
          ></i>
          <i className="fas fa-check-circle" 
            id="weather-submit"
            style={{...styles.bottomIcons, color: "green"}}
            onClick={(e) => this.handleSubmit(this.props.type, "submit", e)}></i>
        </div>
      </div> 
    )
  }
}

WeatherSettings.propTypes = {
  prop: PropTypes.array,
}

export default WeatherSettings;