const express = require("express");
const cors = require("cors");
// READ THE KEY
const dotenv = require("dotenv");
// const { FaSortAmountDown } = require("react-icons/fa");
dotenv.config();
// this will process in env at STRIPE_KEY
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
// use cors origin any
app.use(cors({ origin: true }));

// use or read the json
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success !",
  });
});

// endpoint from react app = "/Payment/create" / server side payment
app.post("/Payment/create", async (req, res) => {
  const total = req.query.total;
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    // this backend will give clientsecreat from payment intent
    res.status(201).json({
      clientSecret: paymentIntent.client_secret, // Correct property name
    });
  } else {
    res.status(403).json({
      message: "total must be greater than 0",
    });
  }
});

app.listen(5000, (err) => {
  if (err) throw err;
  console.log("Server running on port: 5000, http://localhost:5000");
});
