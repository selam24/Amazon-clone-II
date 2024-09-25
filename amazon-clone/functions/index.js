// Importing necessary Firebase and Node.js modules
const { onRequest } = require("firebase-functions/v2/https"); // Importing Firebase Cloud Functions for HTTPS requests
const logger = require("firebase-functions/logger"); // Logger for logging messages
const express = require("express"); // Express framework for building the server
const cors = require("cors"); // CORS middleware for handling cross-origin requests
const dotenv = require("dotenv"); // Dotenv for managing environment variables

// Loading environment variables from the .env file
dotenv.config();

// Initializing Stripe with the secret key from environment variables
const stripe = require("stripe")(process.env.STRIPE_KEY);

// Creating an instance of an Express application
const app = express();

// Using CORS to allow requests from any origin
app.use(cors({ origin: true }));

// Middleware to parse JSON bodies of incoming requests
app.use(express.json());

// Root endpoint to check if the server is running
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success !", // Sending a success message
  });
});

// Endpoint for creating a payment intent from the React app
app.post("/Payment/create", async (req, res) => {
  const total = parseInt(req.query.total); // Retrieving and parsing the total amount from the query parameters

  // Check if the total amount is greater than 0
  if (total > 0) {
    try {
      // Creating a payment intent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // Amount in cents
        currency: "usd", // Currency for the payment
      });

      // Sending the client secret back to the client
      res.status(201).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      // Handling any errors that occur during payment intent creation
      logger.error("Payment Intent creation failed:", error); // Logging the error
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    // Responding with an error if the total is not valid
    res.status(403).json({
      message: "total must be greater than 0", // Informing the client about the invalid total
    });
  }
});

// Exporting the Express app as a Firebase Cloud Function
exports.api = onRequest(app);
