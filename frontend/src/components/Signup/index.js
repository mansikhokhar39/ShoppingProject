import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "./index.css";
const BASE_URL = "https://shopping-backend-h9em.onrender.com";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    showPassword: false,   // 👈 NEW
    loading: false,
    redirectToItems: false
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  togglePassword = () => {
    this.setState(prev => ({
      showPassword: !prev.showPassword
    }));
  };

  handleSignup = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username.trim(),
        password: this.state.password.trim()
      })
    })
      .then(async (res) => {
        const data = await res.json();

        // ✅ IMPORTANT: signup failed → stop here
        if (!res.ok) {
          throw new Error(data.message || "Signup failed");
        }

        // ✅ signup success → auto login
        return fetch("http://localhost:5000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.state.username.trim(),
            password: this.state.password.trim()
          })
        });
      })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("token", data.token);
        this.setState({ redirectToItems: true });
      })
      .catch(err => {
        alert(err.message);   // 👈 proper message now
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    if (this.state.redirectToItems) {
      return <Navigate to="/items" />;
    }

    return (
      <div className="signup-page">
        <form className="signup-card" onSubmit={this.handleSignup}>
          <h2>Sign Up</h2>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />

          {/* 🔐 PASSWORD + SHOW OPTION */}
          <div className="password-field">
            <input
              type={this.state.showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />

            <span
              className="show-password"
              onClick={this.togglePassword}
            >
              {this.state.showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button type="submit" disabled={this.state.loading}>
            {this.state.loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
