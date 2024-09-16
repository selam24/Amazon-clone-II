// Import necessary dependencies and components
import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut"; 
import { DataContext } from "../../Components/DataProvider/DataProvider"; // Context provider for global state
import classes from "./Cart.module.css"; 
import ProductCard from "../../Components/Product/ProductCard"; // Component to display product details
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat"; 
import { Link } from "react-router-dom"; 
import { Type } from "../../Utility/action.type"; // Defines action types for context
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"; 

function Cart() {
  // Destructure basket and user from DataContext and get the dispatch function
  const [{ basket, user }, dispatch] = useContext(DataContext);

  // Calculate the total price of items in the basket
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount; 
  }, 0);

  // Function to increment the amount of an item in the basket
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET, 
      item, 
    });
  };

  // Function to decrement the amount of an item in the basket
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET, 
      id, 
    });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2> 
          <h3>your shopping basket</h3> 
          <hr /> 
          {basket?.length === 0 ? (
            // If basket is empty, display this message
            <p>oops! No item in your cart</p>
          ) : (
            // If basket is not empty, map over basket items
            basket?.map((item, i) => {
              return (
                <section className={classes.cart_product} key={i}>
                  <ProductCard
                    product={item} // Pass item to ProductCard
                    renderDesc={true} // Show product description
                    flex={true} // Use flexbox for layout
                    renderAdd={false} // Do not render 'Add' button
                  />
                  <div className={classes.btn_container}>
                    {/* Button to increment item quantity */}
                    <button
                      className={classes.btn}
                      onClick={() => increment(item)}
                    >
                      <IoIosArrowUp size={30} /> 
                    </button>
                    <span>{item.amount}</span> {/* Display current quantity */}
                    {/* Button to decrement item quantity */}
                    <button
                      className={classes.btn}
                      onClick={() => decrement(item.id)}
                    >
                      <IoIosArrowDown size={30} /> 
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          // Display subtotal and checkout options if basket is not empty
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal({basket?.length} items)</p>{" "}
              {/* Display subtotal with item count */}
              <CurrencyFormat amount={total} />{" "}
              {/* Format and display total amount */}
            </div>
            <span>
              <input type="checkbox" /> {/* Checkbox for gift option */}
              <small>This order contains a gift</small>{" "}
              {/* Label for the checkbox */}
            </span>
            <Link to="/Payment">continue to checkout</Link>{" "}
            {/* Link to proceed to checkout */}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart; 
