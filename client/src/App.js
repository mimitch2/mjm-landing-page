import React, { Component } from 'react';
import './css/App.css';
import SignUpSignIn from "./components/SignUpSignIn";
import TopNavbar from "./components/TopNavBar";
import MainContent from "./containers/MainContentContainer";
import createHistory from 'history/createBrowserHistory'
import { BrowserRouter, Route, Switch } from "react-router-dom";

const history = createHistory()


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signUpSignInError: "",
      authenticated: localStorage.getItem("token") || "",
      userData: this.props.defaultData //will swap out once we get infor from fetch calls
    }
  }

  componentDidMount = () => {
    history.listen((location, action) => {
      console.log(location, action)
    })
  }

  handleSignUp = (credentials) => {
    const { username, password, confirmPassword } = credentials;
    const { userData } = this.state
    if (!username.trim() || !password.trim() ) {
      this.setState({
        signUpSignInError: "Must Provide All Fields"
      });
    } else {
      fetch("/api/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...credentials, data: userData})
      }).then((res) => {
        if (res.status === 422) {
          return res.json().then((text) => {
            this.setState({signUpSignInError: text.error})
          })
        } else {
          return res.json().then((data) => { 
            
            const { token } = data;
            localStorage.setItem("token", token);
            this.setState({
              authenticated: token
            });
            window.location = "/"
          });
        }
      })
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
            window.location = "/"
          });
        }
      })
    }
  }

  handleSignOut = () => {
    localStorage.removeItem("token");
    this.setState({
      authenticated: "",
      signUpSignInError: ""
    });
  }

  render () {       
    return (
      <BrowserRouter>
        <div className="App">
          <TopNavbar 
            showNavItems={this.state.authenticated} 
            onSignOut={this.handleSignOut} />
          <div>
            <Switch>
              <Route exact path="/" render={() => 
                <MainContent loggedIn={this.state.authenticated} />} />
              <Route exact path="/signin" render={ () => 
                <SignUpSignIn 
                  error={this.state.signUpSignInError} 
                  onSignUp={this.handleSignUp} 
                  onSignIn={this.handleSignIn}
                />} />
              <Route render={() => <h1>NOT FOUND!</h1>} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;