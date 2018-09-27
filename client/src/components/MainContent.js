import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WeatherCard from './WeatherCard'

const styles = {
  root: {
    marginTop: "80px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gridAutoRows: "200px",
    padding: "30px"
  }
}

class MainContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.loggedIn ? this.props.fullData : this.props.defaultData
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.loggedIn !== prevProps.loggedIn) {
      this.setState({data: this.props.defaultData})
    }
  }

  render() {
    const { citites } = this.state.data.weather
    return (
      <div className="main-content" style={styles.root}>
        <WeatherCard data={citites}/>
      </div>
    )
  }
}

MainContent.propTypes = {
  prop: PropTypes.array,
}

export default MainContent;