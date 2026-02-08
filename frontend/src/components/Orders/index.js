import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import "./index.css";

class Orders extends Component {
  state = {
    orders: [],
    redirectToLogin: false,
    loading: true
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.setState({ redirectToLogin: true });
      return;
    }

    fetch("http://localhost:5000/orders", {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          orders: Array.isArray(data) ? data : [],
          loading: false
        });
      })
      .catch(() => {
        alert("Failed to load orders");
        this.setState({ loading: false });
      });
  }

  // ✅ SAFE TOTAL CALCULATION
  getOrderTotal = (items) => {
    if (!Array.isArray(items)) return 0;

    return items.reduce((sum, i) => {
      if (!i || !i.itemId || typeof i.itemId.price !== "number") {
        return sum;
      }
      return sum + i.itemId.price * (i.qty || 0);
    }, 0);
  };

  render() {
    const { orders, redirectToLogin, loading } = this.state;

    if (redirectToLogin) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="orders-page">
        <h2>Your Orders 📦</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="empty-orders">
            <p>No orders placed yet</p>
            <Link to="/items" className="shop-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map((order, index) => {
              const safeItems = Array.isArray(order.items)
                ? order.items.filter(i => i?.itemId?.price)
                : [];

              // 👇 first item image preview
              const previewImage =
                safeItems[0]?.itemId?.image || "";

              return (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <h4>Order #{index + 1}</h4>
                    <span className="status">Placed</span>
                  </div>

                  {/* ✅ IMAGE PREVIEW */}
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Order item"
                      className="order-img"
                    />
                  )}

                  <p className="items-count">
                    {safeItems.length} items
                  </p>

                  <p className="order-total">
                    Total: ₹ {this.getOrderTotal(safeItems)}
                  </p>

                  <Link
                    to={`/orders/${order._id}`}
                    className="view-btn"
                  >
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Orders;
