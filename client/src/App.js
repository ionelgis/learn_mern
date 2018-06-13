import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import store from "./store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import "./App.css";

//check for token
if (localStorage.jwtToken) {
  //set auth token header aut
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // se user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout the user
    store.dispatch(logoutUser);
    //TODO clear current profile

    //redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />

            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </div>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
