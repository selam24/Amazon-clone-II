import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../API/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/fireBase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext); // Accessing user and basket data from context

  // Calculating total items in the basket
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount; // Summing the amount of each item
  }, 0);

  // Calculate the total price of items in the basket
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount; // Calculating total price
  }, 0);

  const [cardError, setCardError] = useState(null); // State for card error messages
  const [processing, setProcessing] = useState(); // State to manage processing state
  const stripe = useStripe(); // Initializing Stripe
  const elements = useElements(); // Initializing Elements
  const navigate = useNavigate(); // Hook for navigation

  // Handle changes in CardElement
  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError(""); // Setting card error message
  };

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      setProcessing(true); // Set processing state to true
      // Sending a request to backend to create a payment intent
      const response = await axiosInstance({
        method: "POST",
        url: `/Payment/create?total=${total * 100}`, // Total amount in cents
      });
      console.log(response.data); // Debugging: log the response
      const clientSecret = response.data?.clientSecret; // Extract client secret

      // Confirm the card payment on the client side
      const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement), // Getting the card element
        },
      });
      console.log(confirmation); // Debugging: log the confirmation
      console.log(clientSecret); // Log client secret
      console.log(elements.getElement(CardElement)); // Check if CardElement is correctly retrieved

      // After confirming payment, save order to Firestore and clear basket
      const paymentIntent = confirmation.paymentIntent; // Get payment intent from confirmation
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket, // Save basket data
          amount: paymentIntent.amount, // Save payment amount
          created: paymentIntent.created, // Save creation timestamp
        });

      // Empty the basket in the global state
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false); // Reset processing state
      navigate("/Orders", {
        state: { message: "You have placed a new order" },
      }); // Navigate to Orders page
    } catch (error) {
      console.log(error); // Log any errors
      setProcessing(false); // Reset processing state on error
    }
  };

  return (
    <LayOut>
      {/* Header for checkout */}
      <div className={classes.Payment_header}>Checkout ({totalItem}) Items</div>
      {/* Payment method section */}
      <section className={classes.Payment}>
        {/* Delivery address section */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Alexandria, VA</div>
          </div>
        </div>
        <hr />
        {/* Review items section */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} /> // Display each product in the basket
            ))}
          </div>
        </div>
        <hr />
        {/* Card payment form */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.Payment_card_container}>
            <div className={classes.Payment_details}>
              <form onSubmit={handlePayment}>
                {" "}
                {/* Form submission handler */}
                {/* Display card error message if exists */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* Card input element */}
                <CardElement onChange={handleChange} />
                {/* Display total price and payment button */}
                <div className={classes.Payment_price}>
                  <div>
                    <span>
                      Total order = <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  {/* Submit button for payment */}
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />{" "}
                        {/* Loading spinner */}
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
