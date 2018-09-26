import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import Secret from './Secret'
import { Link } from "react-router-dom";

const TopNavbar = (props) => {
  return (
    <Navbar inverse fixedTop >
      <Navbar.Collapse >
        {!props.showNavItems &&
        <Nav pullRight>
          <Link to="/signin" ><p style={{color: "#9d9d9d", marginTop: "15px", marginRight: "15px"}}>Sign In</p></Link>
        </Nav>
        }
        {props.showNavItems &&
          <div>
            <Nav pullRight>
              <NavItem onClick={props.onSignOut}>Sign Out</NavItem>
            </Nav>
            <Nav pullRight>
              {/* <Link to="/secret"><Navbar.Text>Secret</Navbar.Text></Link> */}
              <Secret /> 
            </Nav>
          </div>
        }
      </Navbar.Collapse>
    </Navbar>
  );
};

TopNavbar.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  showNavItems: PropTypes.string.isRequired
};

export default TopNavbar;
