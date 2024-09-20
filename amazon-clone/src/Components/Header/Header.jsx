// Importing React library and other necessary modules
import React from "react";
import classes from "./Header.module.css"; 
import { Link } from "react-router-dom"; 
import amazon from "../../assets/images/amazon.png"; 
import flag from "../../assets/images/flag.jpg"; 
import PlaceIcon from "@mui/icons-material/Place"; 
import SearchIcon from "@mui/icons-material/Search"; 
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"; 
import LowerHeader from "./LowerHeader"; 
import { useContext } from "react"; //
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from '../../Utility/fireBase'

function Header() {
  // Accessing context data and dispatch function
  const [{user, basket }, dispatch] = useContext(DataContext);

  // Calculating total items in the basket
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section className={classes.fixed}>
      <section className={classes.header_container}>
        <div className={classes.logo_container}>
          {/* Logo section */}
          <Link to="/">
            <img src={amazon} alt="Amazon logo" />
          </Link>
          {/* Delivery section */}
          <div className={classes.delivery}>
            <span>
              {/* Icon for delivery */}
              <PlaceIcon />
            </span>
            <div>
              <p>Delivered to Selam</p>
              <span>Alexandria 22304</span>
            </div>
          </div>
        </div>
        <div className={classes.search}>
          {/* Search bar section */}
          <select name="" id="">
            <option value="">All</option>
            <option value="">Electronics</option>
            <option value="">Women's Fashion</option>
            <option value="">Men Fashion</option>
            <option value="">Jewellery</option>
          </select>
          <input type="text" name="" id="" placeholder="search product" />
          {/* Icon for search */}
          <SearchIcon />
        </div>
        {/* Right side navigation links */}
        <div className={classes.order_container}>
          <div>
            <Link
              to="https://www.amazon.com/customer-preferences/edit?ie=UTF8&preferencesReturnUrl=%2Famazonprime&ref_=topnav_lang"
              className={classes.language}
            >
              <img src={flag} alt="Flag" />
              <select name="" id="">
                <option value="English">EN</option>
                <option value="espanol">ES</option>
              </select>
            </Link>
          </div>
          {/* Sign In link */}
          <Link to={!user && "/Auth"} className={classes.sign}>
            <div>
              {user ? (
                <>
                  <p>Hello {user?.email?.split("@")[0]}</p>
                  <span onClick={()=>auth.signOut()}>Sign Out</span>
                </>
              ) : (
                <>
                  <p> Hello, Sign In</p>
                  <span>Account & Lists</span>
                </>
              )}
            </div>
          </Link>
          {/* Returns & Orders link */}
          <Link to="/Orders">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>
          {/* Shopping cart link */}
          <Link to="/Cart" className={classes.cart}>
            {/* Icon for cart */}
            <AddShoppingCartIcon />
            <span>{totalItem}</span>
          </Link>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header; 
