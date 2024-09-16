import React, { useEffect, useState } from "react";
import classes from "./Result.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../API/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

// Define the Result functional component
function Result() {
  // State to store the list of results (products)
  const [results, setResults] = useState([]);
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(false);

  // Extract categoryName from URL parameters using useParams
  const { categoryName } = useParams();

  // useEffect hook to fetch products based on category when the component mounts
  useEffect(() => {
    setIsLoading(true); // Set loading to true before fetching data
    axios
      .get(`${productUrl}/products/category/${categoryName}`) // Fetch products for the given category
      .then((res) => {
        setResults(res.data); // Update state with fetched product data
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.log(err); // Log any errors that occur during the fetch
        setIsLoading(false); // Set loading to false in case of an error
      });
  }, [categoryName]); // Dependency array includes categoryName to refetch if it changes

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1> 
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr /> {/* Horizontal rule */}
        {isLoading ? (
          <Loader /> // Show Loader component while data is being fetched
        ) : (
          <div className={classes.products_container}>
            {/* Map through results and render a ProductCard for each product */}
            {results?.map((product) => (
              <ProductCard 
                key={product.id} // Unique key for each ProductCard
                product={product} // Pass the product details to ProductCard
                renderDesc={false} // Do not render product description
                renderAdd={true} // Render the "add to cart" button
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Result;

