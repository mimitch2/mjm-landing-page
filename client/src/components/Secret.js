import React, { Component } from "react";

class Secret extends Component {
  constructor() {
    super();

    this.state = {
      message: ""
    };
  }

  componentDidMount() {
    fetch("/api/secret").then((res) => {
      return res.text();
    }).then((data) => {
      this.setState({
        message: data
      });
    });
  }

  render() {
    return (
      <p style={{color: "#AFAFAF", marginTop: "10px"}}>
        <i className="fal fa-user" style={{fontSize: "18px", marginRight: "3px"}}>
        </i>
        {this.state.message}
      </p>
    );
  }
}

export default Secret;
