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

const stripePromise = loadStripe(
  "pk_test_51Q0zfO2LvNOnBAupfvgKLixLPLG1FsM6wVYVQWLFP9k4i0Xa6ETfpQXzkH9RzLSn6wt3U1B6nQb7t9A5SQaLR4Jv00CJSCMJs8"
);

// Function component that sets up routing for the application
function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Auth" element={<Auth />} />
        {/* <Route path="/Payment" element={<Payment />} /> */}
        <Route
          path="/Payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Products/:productId" element={<ProductDetail />} />
        <Route path="/category/:categoryName" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default Routing;
