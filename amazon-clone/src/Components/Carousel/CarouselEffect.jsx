// Import React and necessary components
import React from "react";
import { Carousel } from "react-responsive-carousel"; // Import the Carousel component from the react-responsive-carousel library
import { img } from "./img/data"; // Import the array of image URLs from a local module
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import default styles for the Carousel
import classes from "./carousel.module.css"; 

function CarouselEffect() {
  return (
    <div>
      {/* Carousel component to display a slideshow of images */}
      <Carousel
        autoPlay={true} // Enable automatic playback of slides
        infinityloop={true} // Enable continuous loop of slides 
        showIndicators={false} // Hide the indicator dots for slide navigation
        showThumbs={false} // Hide thumbnail images below the carousel
      >
        {/* Map over the array of image URLs and render each image */}
        {img.map((imageItemLink, index) => {
          return <img key={index} src={imageItemLink} alt="img" />; // Render each image with a unique key and alt text
        })}
      </Carousel>

      {/* Additional div for styling or other content */}
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;
