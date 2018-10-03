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
      userData: {},
      loaded: false
    }
  }

  componentDidMount = () => {
    if (this.state.authenticated) {
      fetch("/api/secret").then((res) => {
        return res.text();
      }).then((data) => {
        this.getUserData(data)
        this.props.setUserName(data)
      });
    }
    history.listen((location, action) => {
      console.log(location, action)
    })
  }

  getUserData (username) {
    this.props.loadUserData(username)
  }


  componentDidUpdate = (prevProps) => {
    if (prevProps.userDataLoaded !== this.props.userDataLoaded) {
      this.setState({userData: this.props.userData}) 
    }

  }

  handleSignUp = (credentials) => {
    const { username, password } = credentials;
    const { defaultData } = this.props
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
        if (res.status === 422) {
          return res.json().then((text) => {
            this.setState({signUpSignInError: text.error})
          })
        } else {
          this.props.setUserName(username)
          return res.json().then((data) => { 
            const { token } = data;
            localStorage.setItem("token", token);
            this.setState({
              authenticated: token,
            });
            window.location = "/"
          });
        }
      }).then(() => {
        if (this.state.authenticated) {
          fetch("/api/data",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...defaultData, userName: credentials.username})
          }).then((res) => {
            return res.json().then((data) => {
              this.props.setUserData(data)
           
            
            })
          })
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
          return res.json().then((text) => {
            this.setState({signUpSignInError: text.error})
          })
        } else {
          window.location = "/"
          this.props.setUserName(username)
          this.getUserData(username)
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
      authenticated: "",
      signUpSignInError: "",
    });
    this.props.setUserData({})
    this.props.setUserName("")
    window.location = "/"
  }


  render () { 
    return (
      <BrowserRouter>
        <div className="App">
          <TopNavbar 
            showNavItems={this.state.authenticated} 
            onSignOut={this.handleSignOut} />
          <Switch>
            <Route exact path="/" render={() => 
              <MainContent loggedIn={this.state.authenticated} 
                // data={this.state.userData}
              />} />
                    
            <Route exact path="/signin" render={ () => 
              <SignUpSignIn 
                error={this.state.signUpSignInError} 
                onSignUp={this.handleSignUp} 
                onSignIn={this.handleSignIn}
              />} />
            <Route render={() => <h1 style={{marginTop: "80px"}}>NOT FOUND!</h1>} />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;