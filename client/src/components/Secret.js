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
      <p style={{color: "#9d9d9d", marginTop: "15px"}}>{this.state.message}</p>
    );
  }
}

export default Secret;
