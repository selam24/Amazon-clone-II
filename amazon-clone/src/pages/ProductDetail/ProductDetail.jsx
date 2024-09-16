import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
// import classes from "./Product.module.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../API/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader';

  
// Define the ProductDetail functional component
function ProductDetail() {
  // setisLoading(true);
  // State to store the product details
  const [product, setProduct] = useState({});
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true); // Initialize as true to indicate loading

  // Extract productId from URL parameters using useParams
  const { productId } = useParams();

  // useEffect hook to fetch product details when the component mounts
  useEffect(() => {
    axios
      .get(`${productUrl}/products/${productId}`) // Fetch product data from API using productId
      .then((res) => {
        setProduct(res.data); // Update state with the fetched product data
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.log(err); // Log any errors that occur during the fetch
        setIsLoading(false); // Set loading to false in case of an error
      });
  }, [productId]); // Dependency array includes productId to refetch if it changes

  return (
    <LayOut>
      {/* Conditional rendering based on loading state */}
      {isLoading ? (
        <Loader /> // Show Loader component while data is being fetched
      ) : (
        <ProductCard
          product={product} // Pass the fetched product to ProductCard
          flex={true} // Apply flex styling to ProductCard
          renderDesc={true} // Render the product description in ProductCard
          renderAdd={true} // Render the "add to cart" button in ProductCard
        />
      )}
    </LayOut>
  );
}

export default ProductDetail;
