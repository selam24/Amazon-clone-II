import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Result from './pages/Results/Result'
import SignIn from './pages/Auth/SignIn'

// Function component that sets up routing for the application
function Routing() {
  return (
    <Router> {/* Wraps the entire routing setup in a Router component */}
      <Routes> {/* Container for all route definitions */}
        <Route path="/" element={<Landing />} /> {/* Route for the homepage, renders the Landing component */}
        <Route path="/Auth" element={<SignIn />} /> {/* Route for the authentication page, renders the SignIn component */}
        <Route path="/Payment" element={<Payment />} /> {/* Route for the payment page, renders the Payment component */}
        <Route path="/Orders" element={<Orders />} /> {/* Route for the orders page, renders the Orders component */}
        <Route path="/Cart" element={<Cart />} /> {/* Route for the shopping cart page, renders the Cart component */}
        <Route path="/Products/:productId" element={<ProductDetail />} /> {/* Route for product details page, renders the ProductDetail component with a dynamic productId */}
        <Route path="/category/:categoryName" element={<Result />} /> {/* Route for category results page, renders the Result component with a dynamic categoryName */}
      </Routes>
    </Router>
  );
}

export default Routing; 

