import React, { Component } from 'react'
import PropTypes from 'prop-types'

const styles = {
  settings: {
    width: "100vw",
    padding: "0px 40px 0px 40px",
    background: "pink",
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

class NewsSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sourcesList: null
    }
  }


  async componentDidMount () {
    const sourcesResp = await fetch("https://newsapi.org/v2/sources?apiKey=cac7992187f24fc493e8b132bee398bb")
    const sources = await sourcesResp.json()
    this.setState({
      sourcesList: sources.sources
    })

  }

  render() {
    return (
      <div className="settings invisible" id="settings" style={styles.settings}>
        <div className="settings-name">{this.props.type}</div>
        <i className="fas fa-cog" 
          onClick={ () => this.props.settingsClick(this.props.type) } 
          style={styles.icon}>
        </i>
      </div> 
    )
  }
}

NewsSettings.propTypes = {
  prop: PropTypes.array,
}

export default NewsSettings;