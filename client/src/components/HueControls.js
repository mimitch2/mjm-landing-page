import React, { Component } from 'react'
import './HueControls.scss'

class HueControls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPicker: false,
      hue: 35000,
      brightness: 200,
      light: 1,
      lights: []
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
      lights: tempArr
    })

  }
    


  colorPicker = ( lt ) => {
    const { light,lights, showPicker } = this.state
    console.log(lights[light - 1].state.hue)
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
    if (lights.length > 0) {
      return (
        <div className="hue-controls">

          {lights.map((light, i) => {
            return (
              <div className="color-picker-title"
                key={light.name}
                onClick={ () => this.colorPicker(i + 1)}>
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
      )
    } else  {return null}
   
  }
}

export default HueControls

