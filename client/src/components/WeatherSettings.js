import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BasicInput from './BasicInput'
import MultiSelect from './MultiSelect'

const styles = {
  settings: {
    width: "100vw",
    padding: "0px 40px 0px 40px",
    // background: "pink",
    position: "absolute",
    top: 85,
    left: 0
  },
  settingsWrapper: {
    width: "100vw",
    display: "flex",
    justifyContent: "center"

  },
  icon: {
    fontSize: "40px",
    color: "grey",
    cursor: "pointer"
  }
}

class WeatherSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sourcesList: null,
      filteredList: null
    }
  }


  async componentDidMount () {
    // const sourcesResp = await fetch("https://newsapi.org/v2/sources?apiKey=cac7992187f24fc493e8b132bee398bb")
    // const sources = await sourcesResp.json()
    // this.setState({
    //   sourcesList: sources.sources,
    //   filteredList: sources.sources
    // })

  }

  filterSources = (input) => {
    const filteredSources = this.state.sourcesList.filter(src => {
      return src.name.toLowerCase().includes(input.toLowerCase())
    })
    
    if (input) {
      this.setState({filteredList: filteredSources})
    } else {
      this.setState({filteredList: this.state.filteredList})
    }
   
    console.log(this.state.sourcesList)

  }

  render() {
    return (
      <div className="settings invisible" id="weather-settings" style={styles.settings}>
        <div className="settings-name">{this.props.type}</div>
        <BasicInput filterSources={this.filterSources}/>
        <MultiSelect sources={this.state.filteredList} />
        <i className="fas fa-cog" 
          onClick={ () => this.props.settingsClick(this.props.type) } 
          style={styles.icon}>
        </i>
      </div> 
    )
  }
}

WeatherSettings.propTypes = {
  prop: PropTypes.array,
}

export default WeatherSettings;