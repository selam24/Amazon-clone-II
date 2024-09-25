// Importing necessary packages
const express = require("express"); // Importing Express framework
const cors = require("cors"); // Importing CORS middleware for cross-origin requests
const dotenv = require("dotenv"); // Importing dotenv for environment variable management

// Loading environment variables from .env file
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
  const total = req.query.total; // Retrieving the total amount from the query parameters

  // Check if the total amount is greater than 0
  if (total > 0) {
    try {
      // Creating a payment intent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // Amount in cents
        currency: "usd", // Currency for the payment
      });
      // Sending the client secret back to the client
      res.status(201).json({
        clientSecret: paymentIntent.client_secret, // Correct property name to access the client secret
      });
    } catch (error) {
      // Handling errors from the Stripe API
      res
        .status(500)
        .json({ message: "Payment processing error", error: error.message });
    }
  } else {
    // Responding with an error if the total is not valid
    res.status(403).json({
      message: "total must be greater than 0", // Informing the client about the invalid total
    });
  }
});

// Starting the server on port 5000
app.listen(5000, (err) => {
  if (err) throw err; // Throw an error if there is an issue starting the server
  console.log("Server running on port: 5000, http://localhost:5000"); // Logging the server's URL
});
