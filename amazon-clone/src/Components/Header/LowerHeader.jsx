import React from 'react'
import MenuIcon from "@mui/icons-material/Menu";
import classes from "./Header.module.css";

function LowerHeader() {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
          <MenuIcon />
          <p>ALL</p>
        </li>
        <li>Today's Deal</li>
        <li>Costumer Service</li>
        <li>Registry</li>
        <li>Gift Card</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader