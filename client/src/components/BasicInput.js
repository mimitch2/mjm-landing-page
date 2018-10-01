import React from 'react'
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";



class FormExample extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 2) return 'success';
    else if (length < 2) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    this.props.filterSources(this.state.value)
  }

  render() {
    return (
      <div >
        <form>
          <FormGroup
            bsSize="sm"
            controlId="formBasicText"
            // validationState={this.getValidationState()}
          >
            <ControlLabel>Search</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Search new sources..."
              onChange={this.handleChange}
              onKeyDown={(e) => e.keyCode === 13 ? e.preventDefault(): null}
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default FormExample;