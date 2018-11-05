import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import Secret from './Secret'
import { Link } from "react-router-dom";

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
      on: [],
      carret: null
    }
  }

  componentDidMount = () => {
    window.addEventListener('sroll', ( e ) =>{ 
      console.log("scroll")
      this.setState({
        carret: null
      })}
    )
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
    const thisLight = lights.find(lght=> lights.indexOf(lght) === lt - 1 )
     
    this.setState({
      on: on.includes(lt) ? on.filter( bulb => bulb !== lt ) 
        : [ ...on, lt ],
      carret: null
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
    const { lights, carret, on } = this.state
    if (on.includes(lt)) {
      this.setState({
        carret: carret !== lt ? lt : null, //*** put a condition if it's on or not */
        light: lt,
        hue: lights[lt - 1].state.hue,
        brightness: lights[lt - 1].state.bri
      })
      this.getHueInfo()
    }

  }

  changeColor = ( e ) => {
    const hue = Math.floor(e.target.value)
    this.setState({
      hue: hue
    })
    fetch(`http://192.168.1.137/api/HnLwzBnIEZeDFoJM4XUlwloW7vLgyp87NZKXYRVf/lights/${this.state.light}/state`, {
      method: "PUT",
      body: JSON.stringify({
        "hue": hue
      })
    })
    this.getHueInfo()
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
       
        <div >
          {lights.length > 0 &&
        <div className="hue-controls">
          <img src="/img/hue.png" alt="phillips hue" 
            width="30px" height="20px" 
            style={{marginRight: "5px", marginTop: "-2px"}}/>
          {lights.map((light, i) => {
            return (
              <div className="light-controls" key={light.name}>
                <div className="color-picker-title"
                  onClick={ () => this.lightSwitch(i + 1)}
                  style={
                    this.state.on.includes(i + 1) ?
                      { background: "#AFAFAF", color: "#444"}
                      : null
                  }
                >
                  {light.name}
                </div>
                {this.state.on.includes( i + 1 ) &&
                <div className="carret-div" 
                  onClick={ ()=> this.colorPicker(i + 1) }
                >
                  
                  <i className="fas fa-caret-right"
                    style={
                      this.state.carret === i + 1 ? 
                        {transform: "rotate(90deg)"}
                        : null
                    }>
                  </i>
                </div>
                }
              </div>
            )
          })
          }

          
          {this.state.carret &&
            <div className="color-picker-wrapper"
              // style={
              //   this.state.carret ? 
              //     {transform: "translateY(30px)"}
              //     : null
              // }
            >
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
          }
        </div>
          }
        </div>
        
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