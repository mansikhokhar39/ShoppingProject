import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "./index.css";

class Home extends Component {
  state = {
    redirectTo: null,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");

    if (token) {
      this.setState({ redirectTo: "/items" });
    }
  }

  goToLogin = () => {
    this.setState({ redirectTo: "/login" });
  };

  goToSignup = () => {
    this.setState({ redirectTo: "/signup" });
  };

  render() {
    const { redirectTo } = this.state;

    if (redirectTo) {
      return <Navigate to={redirectTo} />;
    }

    return (
      <div className="home-page">
        <div className="home-card">
          <h1>Welcome to ShopEasy</h1>
          <p>Please login or sign up to continue</p>

          <button onClick={this.goToLogin}>Login</button>
          <button className="signup-btn" onClick={this.goToSignup}>
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
