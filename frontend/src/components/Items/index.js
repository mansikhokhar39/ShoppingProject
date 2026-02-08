import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "./index.css";

class Items extends Component {
  state = {
    items: [],
    loading: true,
    redirectToLogin: false,
    addedItemId: null
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.setState({ redirectToLogin: true });
      return;
    }

    fetch("http://localhost:5000/items")
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data,
          loading: false
        });
      })
      .catch(() => {
        alert("Failed to load items");
        this.setState({ loading: false });
      });
  }

  addToCart = (itemId) => {
    fetch("http://localhost:5000/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({ itemId })
    })
      .then(res => {
        if (!res.ok) throw new Error();
        this.setState({ addedItemId: itemId });

        setTimeout(() => {
          this.setState({ addedItemId: null });
        }, 1500);
      })
      .catch(() => {
        alert("Failed to add item");
      });
  };

  // ✅ GROUP ITEMS BY CATEGORY
  groupByCategory = () => {
    return this.state.items.reduce((acc, item) => {
      const category = item.category || "Others";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  };

  render() {
    const { loading, redirectToLogin, addedItemId } = this.state;

    if (redirectToLogin) {
      return <Navigate to="/login" />;
    }

    if (loading) {
      return <p style={{ padding: 30 }}>Loading items...</p>;
    }

    const groupedItems = this.groupByCategory();
    const categories = Object.keys(groupedItems);

    return (
      <div className="items-page">
        <h2>Items List 🛍️</h2>

        {categories.length === 0 ? (
          <p>No items available</p>
        ) : (
          categories.map(category => (
            <div key={category} className="category-section">
              <h3 className="category-title">{category}</h3>

              <div className="items-grid">
                {groupedItems[category].map(item => {
                  const isAdded = addedItemId === item._id;

                  return (
                    <div key={item._id} className="item-card">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="item-img"
                        />
                      )}

                      <h4>{item.name}</h4>
                      <p>₹ {item.price}</p>

                      <button
                        disabled={isAdded}
                        className={isAdded ? "added-btn" : ""}
                        onClick={() => this.addToCart(item._id)}
                      >
                        {isAdded ? "Added ✔" : "Add to Cart"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Items;
