import React, { Component } from 'react'
import './HueControls.scss'

class HueControls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPicker: false,
      light: 0,
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
    const fullArr = []
    tempArr.forEach(item => {
      fullArr.push({[tempArr.indexOf(item) + 1]: item})
    })
    this.setState({lights: fullArr})
  }
    
  colorPicker = ( light ) => {
    this.setState({
      showPicker: !this.state.showPicker,
      light: light

    })
  }

  changeColor = ( e ) => {
    console.log( e )
    const hue = Math.floor(e.target.value)
    // this.setState({
    //   lights: hue
    // })
    // console.log(hue)
    fetch(`http://192.168.1.137/api/HnLwzBnIEZeDFoJM4XUlwloW7vLgyp87NZKXYRVf/lights/${this.state.light}/state`, {
      method: "PUT",
      body: JSON.stringify({
        "hue": hue
      })
    })
  }

  changeBrightness = (  e ) => {
    console.log( e)

    const brightness = Number(e.target.value)
    // this.setState({
    //   brightness: brightness
    // })
    fetch(`http://192.168.1.137/api/HnLwzBnIEZeDFoJM4XUlwloW7vLgyp87NZKXYRVf/lights/${this.state.light}/state`, {
      method: "PUT",
      body: JSON.stringify({
        "bri": brightness
      })
    })
  }
  render() {
    const { lights } = this.state
    // console.log(lights)
    return (
      <div className="hue-controls">
        {lights.length > 0 &&
            lights.map((light, i) => {
              console.log(light[i + 1].state.bri)
              return (
                <div key={light[i + 1].name}>
                  <div className="color-picker-title"
                    onClick={ () => this.colorPicker(i + 1)}>
                    {light[i + 1].name}
                  </div>
                  {this.state.showPicker &&
                    <div className="color-picker-div">
                      <div className="color-picker-wrapper">
                        <div className="brightness-slider-wrapper">
                          <input type="range" min="0" max="65535" className="slider hue" 
                            onChange={ this.changeColor }
                            value={light[i + 1].state.hue}
                          />
                        </div>
                        <div className="brightness-slider-wrapper">
                          <input type="range" min="0" max="254" className="slider brightness" 
                            onChange={ this.changeBrightness }
                            value={light[i + 1].state.bri}
                          />
                        </div>
                      </div>
                    </div>
                  }
                </div>
              )
            })
        }
      </div>
    )
  }
}

export default HueControls