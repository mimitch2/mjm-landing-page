import React from 'react'
import PropTypes from 'prop-types'

const styles ={
  content: {
    display: "flex",
  },
  item: {
    marginLeft: "2px",
    marginRight: "2px"
  }
}



const Weather = (props) => {
  const { cities } = props.data
  return (
    <div className="weather">
      {cities.map((city, i) => 
        <div style={styles.content} key={i}>
          <span className="city-name item" style={styles.cityItem}>{city}</span>
        </div>
      )}
    </div>
  )
}

Weather.propTypes = {
  data: PropTypes.object,
}

export default Weather;