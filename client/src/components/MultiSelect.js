import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";


class  MultiSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.sources !== this.props.sources) {
      this.render()
    }
  }



  render() {
    const {sources} = this.props
    // console.log(sources)
    if (sources) {
      return (
        <div >
          <FormGroup controlId="formControlsSelectMultiple">
            <ControlLabel>News Sources</ControlLabel>
            <FormControl componentClass="select" multiple>
              {/* <option value="select">select (multiple)</option> */}
              {sources.map((source, i) => {
                return (
                  <option key={i} value="other">{source.name}<i className="fas fa-plus-square" style={{color: "green"}}></i></option>
                    
                )
              })}
         
            </FormControl>
          </FormGroup>
        </div>
      )
    } else {
      return null
    }
  }
}

export default MultiSelect ;