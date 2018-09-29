import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Fade } from "react-bootstrap";
import Card from './Card'
import Weather from './Weather'
import Sports from './Sports'
import News from './News'
import NewsSettings from './NewsSettings'
import '../css/App.css'

const styles = {
  root: {
    overflowX: "hidden",
    position: "relative",
    // height: "100vh",
    // background: "rgba(255, 255, 255, 0)"
  },
  components: {
    zIndex: "100",
    display: "grid",
    gridGap: "20px",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gridTemplateRows: 375,
    padding: "30px",
    marginTop: "60px",
  }

}

class MainContent extends Component {
  constructor(props) {
    super(props)
    // console.log(props.userData)
    this.state = {
      // data: this.props.userData,
      news:{},
      showSettings: false,
      settings: ""
    }
    
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.loggedIn !== prevProps.loggedIn) {
      this.setState({data: this.props.userData})
    }
  }

  handleClick = (type) => {
    const components =  document.getElementById('components')
    const settings =  document.getElementById('settings')
    components.classList.toggle("invisible")
    settings.classList.toggle("invisible")

    this.setState({
      showSettings: !this.state.showSettings,
      settings: type
    })
  }

  render() {
    console.log(this.props)
    const { weather, sports, news } = this.props.userData
    return (
    
      <div className="main-content" style={styles.root} >
        {/* <Fade in={!this.state.showSettings} appear={true}> */}
        <div className="components" id="components" style={styles.components}>
          <Card component={<Weather data={weather}/>} heading="WEATHER"
            gridColumn="span 1" gridRow="span 1" height= {375} 
            settingsClick={this.handleClick}/>
          <Card component={<Sports data={sports}/>} heading="SPORTS"
            gridColumn="span 1" gridRow="span 1" height= {375}
            settingsClick={this.handleClick}/>
          <Card component={<News data={news}/>} heading="NEWS"
            gridColumn="span 2" gridRow="span 2" height= {375}
            settingsClick={this.handleClick}/>
        </div>
        <div className="settings-wrapper" style={styles.settingsWrapper}>
          <NewsSettings type={this.state.settings} settingsClick={this.handleClick}/>
        </div>
        {/* </Fade> */}
        
        {/* <Fade in={this.state.showSettings}> */}
      
        {/* </Fade> */}
  

      </div>
    )
  }
}

MainContent.propTypes = {
  data: PropTypes.array,
}

export default MainContent;