import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";

// Define the Product functional component
function Product() {
  // State to store fetched products
  const [products, setProducts] = useState();
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true); // Initialize with true as loading starts when component mounts

  // useEffect hook to fetch products when the component mounts
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products") // Fetch products from the fake store API
      .then((res) => {
        setProducts(res.data); // Update products state with the fetched data
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.log(err); // Log any errors that occur during fetching
        setIsLoading(false); // Set loading to false in case of an error
      });
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <>
      {/* Conditional rendering based on loading state */}
      {isLoading ? (
        <Loader /> // Show Loader component while data is being fetched
      ) : (
        <section className={classes.product_container}>
          {/* Map through products and render a ProductCard for each */}
          {products?.map((singleProduct) => {
            return (
              <ProductCard
                product={singleProduct} // Pass the current product to ProductCard
                key={singleProduct.id} // Use product id as the key for each ProductCard
                renderAdd={true} // Pass renderAdd prop to ProductCard
              />
            );
          })}
        </section>
      )}
    </>
  );
}

export default Product;
