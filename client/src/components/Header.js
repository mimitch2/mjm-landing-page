import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Secret from './Secret'
import { Link } from "react-router-dom";
import { SliderPicker } from 'react-color';

import './Header.scss'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPicker: false,
      hue: 35000,
      brightness: 200,
      light: 1,
      lights: [],
      on: []
    }
  }

  componentDidMount = () => {
    this.getHueInfo()
  }

  async getHueInfo () {
    const info = await fetch("http://192.168.1.137/api/HnLwzBnIEZeDFoJM4XUlwloW7vLgyp87NZKXYRVf/lights")
    const hueData = await info.json()
    const tempArr = Object.values(hueData)
    this.setState({
      lights: tempArr,
    })
    tempArr.forEach((lt, i) => {
      if (lt.state.on) {
        this.setState({
          on: [ ...this.state.on, i + 1 ]
        })
      }
       
    })
  }
    
  lightSwitch = ( lt ) => {
    const { on, lights } = this.state
    const thisLight = lights.find((lght, i) => lights.indexOf(lght) === lt - 1 )
    console.log(thisLight)
    this.setState({
      on: on.includes(lt) ? on.filter(bulb => bulb !== lt) 
        : [...on, lt],
    })
    fetch(`http://192.168.1.137/api/HnLwzBnIEZeDFoJM4XUlwloW7vLgyp87NZKXYRVf/lights/${lt}/state`, {
      method: "PUT",
      body: JSON.stringify({
        "on": !thisLight.state.on
      })
    })
    this.getHueInfo()
  }

  colorPicker = ( lt ) => {
    const { light, lights, showPicker } = this.state
    this.setState({
      light: lt,
      showPicker: !showPicker,
      hue: lights[lt - 1].state.hue,
      brightness: lights[lt - 1].state.bri
    })
  }

  changeColor = ( e ) => {
    const hue = Math.floor(e.target.value)
    this.setState({
      hue: hue
    })
    console.log(hue)
    fetch(`http://192.168.1.137/api/HnLwzBnIEZeDFoJM4XUlwloW7vLgyp87NZKXYRVf/lights/${this.state.light}/state`, {
      method: "PUT",
      body: JSON.stringify({
        "hue": hue
      })
    })
  }

  changeBrightness = ( e ) => {
    const brightness = Number(e.target.value)
    this.setState({
      brightness: brightness
    })
    fetch(`http://192.168.1.137/api/HnLwzBnIEZeDFoJM4XUlwloW7vLgyp87NZKXYRVf/lights/${this.state.light}/state`, {
      method: "PUT",
      body: JSON.stringify({
        "bri": brightness
      })
    })
  }
  




  render() {
    const { lights } = this.state
    return (

      <header className="header">
        {lights.length > 0 &&
        <div className="hue-controls">
  
          {lights.map((light, i) => {
            return (
              <div className="color-picker-title"
                key={light.name}
                onClick={ () => this.lightSwitch(i + 1)}
                style={
                  this.state.on.includes(i + 1) ?
                    { background: "#AFAFAF", color: "#444"}
                    : null
                }
              >
                {light.name}
              </div>
            )
          })
          }
          
          {this.state.showPicker &&
          <div className="color-picker-div">
            <div className="color-picker-wrapper">
              <div className="brightness-slider-wrapper">
                <input type="range" min="0" max="65535" className="slider hue" 
                  onChange={this.changeColor}
                  value={this.state.hue}/>
              </div>
              <div className="brightness-slider-wrapper">
                <input type="range" min="0" max="254" className="slider brightness" 
                  onChange={this.changeBrightness}
                  value={this.state.brightness}/>
              </div>
           
            </div>
     
          </div>
          }
          
        </div>
        }
        {!this.props.showNavItems &&
      <nav className="right-nav">
        <Link to="/signin"
          style={{color: "#AFAFAF"}}>
            Sign In
        </Link>
      </nav>
        }
        {this.props.showNavItems &&
          <nav className="right-nav">
            <div className="sign-out"
              onClick={this.props.onSignOut}>
              Sign Out
            </div>
            <div>
              <Secret /> 
            </div>
          </nav>
        }
      </header>
    )
  }
}

// Header.propTypes = {
//   prop: PropTypes.array,
// }

export default Header;