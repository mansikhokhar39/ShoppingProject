import React, { Component } from "react";
import { Navigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import "./index.css";
const BASE_URL = "https://shopping-backend-h9em.onrender.com";

class OrderDetailsClass extends Component {
  state = {
    orderItems: [],
    redirectToLogin: false
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.setState({ redirectToLogin: true });
      return;
    }

    const orderIndex = this.props.orderId;

    // ✅ FETCH ORDERS FROM BACKEND
    fetch(`${BASE_URL}/orders`, {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(orders => {
        const order = orders[orderIndex];
        if (!order) return;

        // backend already sends { itemId, qty }
        // itemId is populated
        this.setState({
          orderItems: order.items
        });
      })
      .catch(() => {
        alert("Failed to load order details");
      });
  }

  render() {
    if (this.state.redirectToLogin) {
      return <Navigate to="/login" />;
    }

    const total = this.state.orderItems.reduce(
      (sum, c) => sum + c.itemId.price * c.qty,
      0
    );

    return (
      <>
        <Navbar />

        <div className="order-details-page">
          <h2>Order Details 📦</h2>

          {this.state.orderItems.length === 0 ? (
            <p>No items found for this order</p>
          ) : (
            <>
              <ul className="order-items">
                {this.state.orderItems.map(c => (
                  <li key={c.itemId._id}>
                    <span className="item-name">
                      {c.itemId.name} × {c.qty}
                    </span>
                    <span className="item-price">
                      ₹ {c.itemId.price * c.qty}
                    </span>
                  </li>
                ))}
              </ul>

              <h3>Total: ₹ {total}</h3>
            </>
          )}
        </div>
      </>
    );
  }
}

// wrapper for params
export default function OrderDetails() {
  const { id } = useParams();
  return <OrderDetailsClass orderId={id} />;
}
