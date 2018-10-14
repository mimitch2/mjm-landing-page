import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import Moment from 'react-moment';

// const styles ={
//   content: {
//     display: "flex",
//   },
//   item: {
//     marginLeft: "2px",
//     marginRight: "2px"
//   },
//   stockItem: {
//     display: "flex",
//     flexDirection: "column",
//     borderBottom: "1px solid grey",
//     minHeight: "130px",
//     padding: "16px 0 0 12px"
//   },
//   itemLoading: {
//     height: "130px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   lineItem: {
//     display: "flex",
//     justifyContent: "flex-start",
//     textAlign: "left"
//   },
//   time: {
//     marginLeft: "2px",
//     fontSize: "12px",
//     color: "grey",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "felx-end"
//   }
// }

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stocks: []
    }
  }

  componentDidMount = () => {

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

  async getData (stocks) {
    try {
     
    } catch (error) {
      // document.getElementById('weather').innerHTML = error
      console.log(error);
    }  
  }

  render() {
    if (this.state.stocks) {
      
   
      return (
        <div>STOCKS</div>
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