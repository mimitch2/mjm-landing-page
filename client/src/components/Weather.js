import React, { Component } from 'react'
// import PropTypes from 'prop-types'


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
    borderBottom: "2px solid grey"
  },
  lineItem: {
    display: "flex",
    justifyContent: "flex-start",
    textAlign: "left"
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
      this.getData()
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
                      {`${city.name} - ${Math.floor(temp[0].currently.temperature)}º`}
                    </div>
                    <div style={styles.lineItem}>
                      {temp[0].daily.summary}
                    </div>
             
                  </div>
                </div>
              )
            } else {
              return <div key={i}><i className="fal fa-sync spin-sync"></i></div>
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