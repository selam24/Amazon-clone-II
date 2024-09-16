import React, { useContext } from "react";
import { Rating } from "@mui/material";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

// Define the ProductCard functional component
function ProductCard({ product, flex, renderDesc, renderAdd }) {
  // Destructure product properties
  const {
    image,
    title,
    id,
    rating = { rate: 0, count: 0 },
    price,
    description,
  } = product;

  // Access global state and dispatch function from DataContext
  const [state, dispatch] = useContext(DataContext);

  // Function to handle adding a product to the cart
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET, // Action type to add product to the basket
      item: {
        image,
        title,
        id,
        rating,
        price,
        description, // Product details to add
      },
    });
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : "" // Apply flex style if 'flex' prop is true
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className={classes.img_container} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && (
          <div style={{ maxWidth: "750px" }}>{description}</div>
        )}{" "}
        {/* Conditionally render product description */}
        <div className={classes.rating}>
          <Rating value={rating.rate} precision={0.1} />{" "}
          {/* Display product rating */}
          <small>{rating.count}</small> {/* Display number of ratings */}
        </div>
        <div>
          <CurrencyFormat amount={price} />{" "}
          {/* Display formatted product price */}
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            add to cart
          </button>
        )}{" "}
        {/* Conditionally render "add to cart" button */}
      </div>
    </div>
  );
}

export default ProductCard;
