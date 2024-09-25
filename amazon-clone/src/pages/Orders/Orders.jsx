import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Orders.module.css";
import { db } from "../../Utility/fireBase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext); // Accessing user data from context
  const [orders, setOrders] = useState([]); // State to store orders

  useEffect(() => {
    if (user) {
      // If user is authenticated, fetch orders from Firestore
      const unsubscribe = db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot); // Debugging: log the snapshot
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(), // Mapping document data to state
            }))
          );
        });

      // Clean up subscription on unmount
      return () => unsubscribe();
    } else {
      setOrders([]); // Clear orders if user is not authenticated
    }
  }, [user]); // Dependency array includes user to re-run effect when user changes

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {/* Conditional rendering for empty orders */}
          {orders?.length === 0 && (
            <div style={{ padding: "20px" }}>You don't have Orders yet</div>
          )}
          <div>
            {/* Mapping through orders to display each order */}
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order Id: {eachOrder?.id}</p>
                  {/* Displaying each product in the order */}
                  {eachOrder?.data?.basket?.map((order) => (
                    <ProductCard flex={true} product={order} key={order.id} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
