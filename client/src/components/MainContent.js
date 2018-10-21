import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '../containers/CardContainer'
import Weather from '../containers/WeatherContainer'
import Sports from '../containers/SportsContainer'
import News from '../containers/NewsContainer'
import Stocks from './Stocks'
import NewsSettings from '../containers/NewsSettingsContainer'
import SportsSettings from '../containers/SportsSettingsContainer'
import WeatherSettings from '../containers/WeatherSettingsContainer'
import '../css/App.css'

const styles = {
  root: {
    overflowX: "hidden",
    position: "relative",
    height: "100vh",
    // background: "rgba(255, 255, 255, 0)"
  },
  components: {
    zIndex: "100",
    display: "grid",
    gridGap: "20px",
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
    gridTemplateRows: 150,
    padding: "30px",
    marginTop: "60px",
  },
  loading: {
    marginTop: "90px",
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    fontSize: "40px",
  }

}

class MainContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      news:{},
      showSettings: false,
      settings: "",
      data: {}
    }
  }

  // componentDidUpdate = (prevProps) => {
  //   if (prevProps.loggedIn  !==  this.props.loggedIn && this.props.loggedIn) {
  //     this.setState({data: this.props.userData})
  //   }
  //   //  else if (prevProps.loggedIn  !==  this.props.loggedIn && !this.props.loggedIn) {
  //   //   this.setState({data: this.props.defaultData})
  //   // }
  //   if (prevProps.data.news.sources !== this.props.data.news.sources) {
  //     this.setState({data: this.props.data})
  //   }
  // }

  handleClick = (type) => {
    window.scrollTo(0, 0)
    const components =  document.getElementById('components')
    const settings =  document.getElementById(`${type.toLowerCase()}-settings`)
    components.classList.toggle("invisible")
    settings.classList.toggle("invisible")

    this.setState({
      showSettings: !this.state.showSettings,
      settings: type
    })
  }

  render() {
    if (this.props.userDataLoaded && this.props.userName) {
      const { news } = this.props.userData
      return (
        <div className="main-content" style={styles.root} >

          <div className="components" id="components" style={styles.components}>

            {/* <Card heading="NEWS" 
              gridColumn="span 2" gridRow="span 4" height= {600}
              settingsClick={this.handleClick}
              options = {news.sources}
            >

              <News />

            </Card>
            <Card heading="WEATHER" //!!!!!!!!!!!!!!!
              gridColumn="span 1" gridRow="span 2" height= {300} 
              settingsClick={this.handleClick}>

              <Weather />

            </Card> */}
            <Card heading="SPORTS" //!!!!!!!!!!!!!!!
              gridColumn="span 1" gridRow="span 2" height= {300}
              settingsClick={this.handleClick}>

              <Sports />

            </Card>
            <Card heading="STOCKS" //!!!!!!!!!!!!!!!
              gridColumn="span 1" gridRow="span 2" height= {300}
              settingsClick={this.handleClick}>

              <Stocks />

            </Card>

          </div>

          <div className="settings-wrapper" style={styles.settingsWrapper}>
            <NewsSettings type={this.state.settings} settingsClick={this.handleClick}/>
            <SportsSettings type={this.state.settings} settingsClick={this.handleClick} />
            <WeatherSettings type={this.state.settings} settingsClick={this.handleClick} />
          </div>

        </div>
      )
    } else {
      return(  
        <div className="loading" style={styles.loading}>
          <i className="fal fa-sync spin-sync" style={styles.icon}></i>
        </div>
      )
    }
  }
}

MainContent.propTypes = {
  data: PropTypes.object,
}

export default MainContent;