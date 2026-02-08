import React, { Component } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Items from "./components/Items";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import OrderSuccess from "./components/OrderSuccess";




/* Helper to use location in class-based app */
function Layout({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Navbar sirf login ke baad aur items page par
  const showNavbar =
    token &&
    !["/", "/login", "/signup"].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}

class App extends Component {
  render() {
    return (
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


          {/* Protected route */}
          <Route
            path="/items"
            element={
              <ProtectedRoute>
                <Items />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:orderId"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
/>

        </Routes>
      </Layout>
    );
  }
}

export default App;
