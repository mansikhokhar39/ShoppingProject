import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import "./index.css";

class Navbar extends Component {
  state = {
    logout: false,
    cartCount: 0
  };

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.setState({ cartCount: cart.length });
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    this.setState({ logout: true });
  };

  render() {
    if (this.state.logout) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="navbar">
        <div className="nav-left">
          <h3>ShopEasy</h3>
        </div>

        <div className="nav-right">
          <Link to="/items">Items</Link>
          <Link to="/orders">Orders</Link>

          <Link to="/cart" className="cart-link">
            Cart
            {this.state.cartCount > 0 && (
              <span className="cart-badge">{this.state.cartCount}</span>
            )}
          </Link>

          <button onClick={this.handleLogout}>Logout</button>
        </div>
      </div>
    );
  }
}

export default Navbar;
