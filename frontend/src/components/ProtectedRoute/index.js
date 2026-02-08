import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class ProtectedRoute extends Component {
  render() {
    const token = localStorage.getItem("token");

    // agar token nahi hai → login page
    if (!token) {
      return <Navigate to="/login" />;
    }

    // token hai → page dikhao
    return this.props.children;
  }
}

export default ProtectedRoute;
