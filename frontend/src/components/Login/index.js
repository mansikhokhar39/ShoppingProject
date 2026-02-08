import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "./index.css";
const BASE_URL = "https://shopping-backend-h9em.onrender.com";

class Login extends Component {
  state = {
    username: "",
    password: "",
    loading: false,
    redirectTo: null
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ redirectTo: "/items" });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username.trim(),
        password: this.state.password.trim()
      })
    })
      .then(async (res) => {
        // ❌ user signup nahi hai
        if (res.status === 400) {
          alert("Account not found. Please sign up first.");
          this.setState({ redirectTo: "/signup" });
          return;
        }

        if (!res.ok) {
          throw new Error("Login failed");
        }

        return res.json();
      })
      .then((data) => {
        if (!data) return;

        // ✅ login success
        localStorage.setItem("token", data.token);
        this.setState({ redirectTo: "/items" });
      })
      .catch(() => {
        alert("Invalid username or password");
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    if (this.state.redirectTo) {
      return <Navigate to={this.state.redirectTo} />;
    }

    return (
      <div className="login-page">
        <form className="login-card" onSubmit={this.handleLogin}>
          <h2>Login</h2>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button type="submit" disabled={this.state.loading}>
            {this.state.loading ? "Logging in..." : "Login"}
          </button>

          <p className="signup-link">
            New user?{" "}
            <span onClick={() => this.setState({ redirectTo: "/signup" })}>
              Sign up
            </span>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
