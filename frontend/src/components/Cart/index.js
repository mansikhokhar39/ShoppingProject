import React, { Component } from "react";
import { Navigate, useLocation } from "react-router-dom";
import "./index.css";

/* Wrapper */
function CartWithLocation(props) {
  const location = useLocation();
  return <Cart {...props} location={location} />;
}

class Cart extends Component {
  state = {
    cart: [],
    redirectToLogin: false,
    redirectToOrders: false,
    loading: true,

    showCheckoutForm: false,
    address: "",

    // ✅ NEW: success card
    orderPlaced: false
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.setState({ redirectToLogin: true });
      return;
    }
    this.loadCart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.loadCart();
    }
  }

  loadCart = () => {
    fetch("http://localhost:5000/carts", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          cart: Array.isArray(data?.items) ? data.items : [],
          loading: false
        });
      });
  };

  increaseQty = (itemId) => {
    fetch("http://localhost:5000/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({ itemId })
    }).then(() => this.loadCart());
  };

  decreaseQty = (itemId, qty) => {
    if (qty === 1) return;
    this.setState(prev => ({
      cart: prev.cart.map(c =>
        c.itemId && c.itemId._id === itemId
          ? { ...c, qty: c.qty - 1 }
          : c
      )
    }));
  };

  getTotal = () => {
    return this.state.cart.reduce((sum, c) => {
      if (!c.itemId) return sum;
      return sum + c.itemId.price * c.qty;
    }, 0);
  };

  openCheckout = () => {
    this.setState({ showCheckoutForm: true });
  };

  placeOrder = () => {
    if (!this.state.address.trim()) return;

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => {
        if (!res.ok) throw new Error();
        // ✅ show success card instead of alert
        this.setState({
          orderPlaced: true,
          showCheckoutForm: false
        });
      })
      .catch(() => {});
  };

  render() {
    const {
      redirectToLogin,
      redirectToOrders,
      cart,
      loading,
      showCheckoutForm,
      address,
      orderPlaced
    } = this.state;

    if (redirectToLogin) return <Navigate to="/login" />;
    if (redirectToOrders) return <Navigate to="/orders" />;

    /* ✅ ORDER SUCCESS CARD */
    if (orderPlaced) {
      return (
        <div className="order-success-card">
          <h2>🎉 Order Successfully Placed</h2>
          <p>{cart.length} items</p>
          <h3>Total: ₹ {this.getTotal()}</h3>

          <button
            className="view-orders-btn"
            onClick={() => this.setState({ redirectToOrders: true })}
          >
            View My Orders
          </button>
        </div>
      );
    }

    return (
      <div className="cart-page">
        <h2>Your Cart 🛒</h2>

        {loading ? (
          <p>Loading...</p>
        ) : cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((c, index) => {
                if (!c.itemId) return null;
                return (
                  <li key={c.itemId._id || index} className="cart-row">
                    <div className="cart-item">
                      {c.itemId.image && (
                        <img
                          src={c.itemId.image}
                          alt={c.itemId.name}
                          className="cart-img"
                        />
                      )}
                      <div>
                        <strong>{c.itemId.name}</strong>
                        <p>₹ {c.itemId.price}</p>
                      </div>
                    </div>

                    <div className="qty-controls">
                      <button onClick={() => this.decreaseQty(c.itemId._id, c.qty)}>−</button>
                      <span>{c.qty}</span>
                      <button onClick={() => this.increaseQty(c.itemId._id)}>+</button>
                    </div>

                    <div>₹ {c.itemId.price * c.qty}</div>
                  </li>
                );
              })}
            </ul>

            <h3>Total: ₹ {this.getTotal()}</h3>

            {!showCheckoutForm && (
              <button className="checkout-btn" onClick={this.openCheckout}>
                Checkout
              </button>
            )}

            {showCheckoutForm && (
              <div className="checkout-box">
                <h4>Delivery Address</h4>
                <textarea
                  placeholder="Enter full address"
                  value={address}
                  onChange={(e) => this.setState({ address: e.target.value })}
                />
                <button className="place-btn" onClick={this.placeOrder}>
                  Place Order
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

export default CartWithLocation;
