import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Result from "./pages/Results/Result";
import Auth from "./pages/Auth/Auth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Components/ProtectedRoute";

// Loading Stripe with the public key
const stripePromise = loadStripe(
  "pk_test_51Q0zfO2LvNOnBAupfvgKLixLPLG1FsM6wVYVQWLFP9k4i0Xa6ETfpQXzkH9RzLSn6wt3U1B6nQb7t9A5SQaLR4Jv00CJSCMJs8"
);

// Function component that sets up routing for the application
function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} /> {/* Landing page route */}
        <Route path="/Auth" element={<Auth />} /> {/* Authentication route */}
        {/* Payment route wrapped in ProtectedRoute to ensure user is logged in */}
        <Route
          path="/Payment"
          element={
            <ProtectedRoute message={"You must LogIn to Pay"} redirect={"/payment"}>
              <Elements stripe={stripePromise}> {/* Stripe context for payment processing */}
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        {/* Orders route wrapped in ProtectedRoute */}
        <Route
          path="/Orders"
          element={
            <ProtectedRoute message={"You must LogIn to access your Orders"} redirect={"/Orders"}>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/Cart" element={<Cart />} /> {/* Cart route */}
        <Route path="/Products/:productId" element={<ProductDetail />} /> {/* Product detail route */}
        <Route path="/category/:categoryName" element={<Result />} /> {/* Result route for categories */}
      </Routes>
    </Router>
  );
}

export default Routing;