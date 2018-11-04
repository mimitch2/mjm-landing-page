import React from 'react'
import { FormGroup, FormControl } from "react-bootstrap";



class FormExample extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }

  // getValidationState() {
  //   const length = this.state.value.length;
  //   if (length > 2) return 'success';
  //   else if (length < 2) return 'warning';
  //   else if (length > 0) return 'error';
  //   return null;
  // }

  handleChange(e) {
    this.setState({ value: e.target.value });
    setTimeout(() => {
      this.props.sendInput(this.state.value)
    }, 40);
  }

  render() {
    return (
      <form style={{width: "100%"}}>
        <FormGroup
          bsSize="sm"
          // controlId="formBasicText"
          // validationState={this.getValidationState()}
        >
          <FormControl
            id="formControlsText"
            style={{borderRadius: "30px"}}
            type="text"
            value={this.state.value}
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
            onKeyDown={(e) => e.keyCode === 13 ? e.preventDefault() : null}
          />
        </FormGroup>
      </form>
    );
  }
}

export default FormExample;