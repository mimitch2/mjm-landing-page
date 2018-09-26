import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MainContent extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="main-content" style={{marginTop:"80px"}}>
        {this.props.loggedIn &&
      <h1>Ur logged in bro</h1>
      || <h1>U no logged in dude</h1>
        }
      </div>
    )
  }
}

MainContent.propTypes = {
  prop: PropTypes.array,
}

export default MainContent;