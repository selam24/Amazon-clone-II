import React from 'react'
import classes from "../Catagory/Category.module.css"
import {Link} from 'react-router-dom'

// Define the CategoryCard functional component
function CategoryCard({ data }) {
  return (
    <div className={classes.category}>
      <Link to={`/category/${data.name}`}> {/* Link to navigate to the category page */}
        <span>
          <h2>{data?.title}</h2> {/* Display the title of the category */}
        </span>
        <img src={data?.imgLink} alt="" /> {/* Display the image for the category */}
        <p>shop now</p> {/* Text prompting the user to shop now */}
      </Link>
    </div>
  );
}

export default CategoryCard; 
