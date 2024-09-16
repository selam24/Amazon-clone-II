import React from "react";
import { CategoryInfos } from "./categoryFullinfos";
import CategoryCard from "./CatagoryCard";
import classes from "../Catagory/Category.module.css";

// Define the Category functional component
function Category() {
  return (
    <section className={classes.category_container}> {/* Container for all category cards */}
      {CategoryInfos.map((infos) => (
        <CategoryCard key={infos.name} data={infos} /> // Render a CategoryCard for each item in CategoryInfos
      ))}
    </section>
  );
}

export default Category; 


