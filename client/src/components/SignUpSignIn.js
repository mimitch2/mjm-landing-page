import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Row, Col, Alert } from "react-bootstrap";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

class SignUpSignIn extends Component {

  renderError() {
    return (
      <Alert bsStyle="danger">
        <strong>{this.props.error}</strong>
      </Alert>
    );
  }

  render() {
    return (
      <div className="sing-up-in" style={{marginTop:"80px"}}>
        <Row>
          <Col xs={8} xsOffset={2}>
            {this.props.error && this.renderError()}
            <Tabs defaultActiveKey={1} id="signup-signin-tabs">
              <Tab eventKey={1} title="Sign In">
                <SignIn onSignIn={this.props.onSignIn} />
              </Tab>
              <Tab eventKey={2} title="Sign Up">
                <SignUp onSignUp={this.props.onSignUp} />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </div>
    )
  }
}

SignUpSignIn.propTypes = {
  error: PropTypes.string,
  onSignUp: PropTypes.func,
  onSignIn: PropTypes.func
};

export default SignUpSignIn;
