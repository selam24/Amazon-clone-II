import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard"
import {
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";


function Payment() {
  const [{ user, basket }] = useContext(DataContext);
  console.log(user);
  console.log(basket);

  // Calculating total items in the basket
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  // Calculate the total price of items in the basket
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);


  const [cardError, setCardError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = (e)=>{
    e.preventDefault()

    //  backend || function ....> contact to the client secret
    

    // client side(react side) conformation

    // after the confirm ...> order firestore save, clear basket

  }

  return (
    <LayOut>
      {/* header */}
      <div className={classes.Payment_header}>Checkout ({totalItem}) Items</div>
      {/* payment method */}
      <section className={classes.Payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          {/* {user && ( */}
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Alexandria, VA</div>
          </div>
          {/* )} */}
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.Payment_card_container}>
            <div className={classes.Payment_details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />

                {/* pay price */}
                <div className={classes.Payment_price}>
                  <div>
                    <span>
                      Total order = <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button>Pay Now</button>
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
