import React, { Component } from 'react';
import './css/App.css';
import SignUpSignIn from "./components/SignUpSignIn";
import TopNavbar from "./components/TopNavBar";
import Secret from "./components/Secret";
// import Foo from './components/Foo.js';//****Change to container if using */
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signUpSignInError: "",
      authenticated: localStorage.getItem("token") || false
    };
  }


  handleSignUp = (credentials) => {
    const { username, password, confirmPassword } = credentials;
    if (!username.trim() || !password.trim() ) {
      this.setState({
        signUpSignInError: "Must Provide All Fields"
      });
    } else {

      fetch("/api/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(credentials)
      }).then((res) => {
        return res.json();
      }).then((data) => {
        const { token } = data;
        localStorage.setItem("token", token);
        this.setState({
          signUpSignInError: "",
          authenticated: token
        });
      });
    }
  }

  handleSignIn = (credentials) => {

    const { username, password } = credentials;

    if (!username.trim() || !password.trim() ) {
      this.setState({
        signUpSignInError: "Must Provide All Fields"
      });
    } else {
      fetch("/api/sessions", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(credentials)
      }).then((res) => {
        if (res.status === 422) {
          return res.json().then((text) => {//need to do this for other errors
            this.setState({signUpSignInError: text.error})
          })
        } else {
          return res.json().then((data) => { 
            const { token } = data;
            localStorage.setItem("token", token);
            this.setState({
              authenticated: token
            });
          });
        }
      })
    }
  }

  handleSignOut = () => {
    localStorage.removeItem("token");
    this.setState({
      authenticated: false
    });
  }

  renderSignUpSignIn = () => {
    return (
      <SignUpSignIn 
        error={this.state.signUpSignInError} 
        onSignUp={this.handleSignUp} 
        onSignIn={this.handleSignIn}
      />
    );
  }

  renderApp = () => {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <h1>Default and/or custom content</h1>} /> {/* this is what will show once user is signed in OR just default info */}
          <Route exact path="/secret" component={Secret} />
          <Route render={() => <h1>NOT FOUND!</h1>} />
        </Switch>
      </div>
    );
  }

  render () {
    let whatToShow = "";
    if (this.state.authenticated) {
      whatToShow = this.renderApp();
    } else {
      whatToShow = this.renderSignUpSignIn();
    }
       
    return (
      <BrowserRouter>
        <div className="App">
          <TopNavbar 
            showNavItems={this.state.authenticated} 
            onSignOut={this.handleSignOut} />
          {whatToShow}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;