import React, { Component } from 'react'
// import PropTypes from 'prop-types'
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

class SporstSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sourcesList: null,
      filteredList: null
    }
  }


  componentDidUpdate (prevProps) {
    if (prevProps.userData !== this.props.userData) {
      this.setState({
        sourcesList: this.props.userData.sports.teams,
        filteredList: this.props.userData.sports.teams
      })
    }

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
   
  }

  render() {
    if (this.props.userData) {
      return (
        <div className="settings invisible" id="sports-settings" style={styles.settings}>
          <div className="settings-name">{this.props.type}</div>
          <BasicInput filterSources={this.filterSources} />
          <MultiSelect sources={this.state.filteredList} />
          <i className="fas fa-cog" 
            onClick={ () => this.props.settingsClick(this.props.type) } 
            style={styles.icon}>
          </i>
        </div> 
      )
    } else {
      return null;
    }
   
  }
}

SporstSettings.propTypes = {
  // prop: PropTypes.array,
}

export default SporstSettings;