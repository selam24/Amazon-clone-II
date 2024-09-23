const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
// READ THE KEY
const dotenv = require("dotenv");
const { FaSortAmountDown } = require("react-icons/fa");
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

// endpoint from react app = "/Payment/create"
app.post("/Payment/create", async (req, res) => {
  const total = req.query.total;
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
   
    // this backend will give clientsecreat from payment intent
    res.status(201).json({clientSecret: paymentIntent.clientSecret,});
  } else {
    res.status(403).json({
      message: "total must be greater than 0",
    });
  }
});

exports.api = onRequest(app);
