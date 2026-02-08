import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./index.css";

class OrderSuccess extends Component {
  state = {
    redirect: null
  };

  goToOrders = () => {
    this.setState({ redirect: "/orders" });
  };

  goToItems = () => {
    this.setState({ redirect: "/items" });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    return (
      <>
        <Navbar />

        <div className="success-page">
          <div className="success-card">
            <h2>🎉 Order Placed Successfully!</h2>
            <p>Your order has been placed. Thank you for shopping.</p>

            <div className="success-actions">
              <button onClick={this.goToOrders}>View Orders</button>
              <button className="secondary" onClick={this.goToItems}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default OrderSuccess;
