import React, { Component } from 'react'
import PropTypes from 'prop-types'

const styles = {
  card: {
    background: "grey",
    gridColumn: "span 1",
    padding: "10px",
    borderRadius: "3px",
    boxShadow: "1px 1px 6px rgba(0, 0, 0, .3)"
  },
  content: {
    display: "flex",
  //   justifyContent: "space-between"
  },
  cityItem: {
    marginLeft: "2px",
    marginRight: "2px"
  }

}

class WeatherCard extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { data } = this.props
    return (
      <div className="card" style={styles.card}>
        <h2 className="card-content">
          Weather
        </h2>
        {data.map((city, i) => 
          <div style={styles.content} key={i}>
            <span className="city-name city-item" style={styles.cityItem}>{city}</span>
          </div>
        )}
      </div>
    )
  }
}

WeatherCard.propTypes = {
  // content: PropTypes.array,
}

export default WeatherCard;