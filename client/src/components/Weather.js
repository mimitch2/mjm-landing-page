import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import Moment from 'react-moment';
import Skycons from 'skycons-component'

const styles ={
  content: {
    display: "flex",
  },
  item: {
    marginLeft: "2px",
    marginRight: "2px"
  },
  cityItem: {
    display: "flex",
    flexDirection: "column",
    borderBottom: "1px solid grey",
    height: "130px",
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

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: []
    }
  }

  componentDidMount = () => {
    this.props.userData.weather.cities.forEach(city =>{
      this.getData(city)
    })
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.userData !== this.props.userData || prevProps.userName !== this.props.userName){
      this.props.userData.weather.cities.forEach(city =>{
        this.getData(city) 
      })
    }
    if (prevProps.currentWeather !== this.props.currentWeather) {
      this.setState({weather: this.props.currentWeather})
    }

  }

  async getData (city) {
    try {
      const weather = await this.props.loadWeather(city)
      if (weather) {
        const tempArr = [...this.state.weather, weather]
        this.setState({weather: tempArr})
      }
    } catch (error) {
      // document.getElementById('weather').innerHTML = error
      console.log(error);
    }  
  }

  render() {
    const { cities } = this.props.userData.weather   
    // console.log(this.props.currentWeather)
    if (this.props.userData.weather.cities) {
      return (
        <div className="weather">
          {cities.map((city, i) => {
            const temp = this.props.currentWeather.filter(cty => {
              return cty.id === city.id
            })
            if (temp.length === 1) {
              return (
                <div style={styles.content} key={i}>
                  <div className="city-name item" style={styles.cityItem}>
                    <div style={styles.lineItem}>
                      <div style={{fontSize: "20px", fontWeight: "500"}}>      { `${city.name}, ${city.region}` }
                      </div>
                      <div style={{fontSize: "18px", fontWeight: "300"}}>
                        {` - ${Math.floor(temp[0].currently.temperature)}º`}
                      </div> 
                     
                    </div>
                    <div 
                      style={{margin: "-30px 0px 0px 200px",
                        transform: "translate(-30px, "
                      }}>
                      <Skycons 
                      // animate={true}
      	               iconColor='rgb(70 70 70)'
      	               style={{width: 50, height: 50}}
                        icon={temp[0].currently.icon} 
                      />
                    </div>
                    <Moment unix format ="MM/DD hh:mma" 
                      style={styles.time}>          
                      {temp[0].currently.time}
                    </Moment>
                    <div style={styles.lineItem}>
                      {temp[0].daily.summary}
                    </div>
             
                  </div>
                </div>
              )
            } else {
              return <div key={i} style={styles.itemLoading}><i className="fal fa-sync spin-sync"></i></div>
            }
          }
          )}
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

export default Weather;