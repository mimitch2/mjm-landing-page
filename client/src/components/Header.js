import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Secret from './Secret'
import { Link } from "react-router-dom";
import HueControls from './HueControls'

import './Header.scss'
import './HueControls.scss'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  render() {
    
    return (

      <header className="header">
        <div>
          <HueControls />
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