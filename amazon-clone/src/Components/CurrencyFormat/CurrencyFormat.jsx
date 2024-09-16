import React from "react"; // Import React library for creating components

// Helper function to format a number as currency
const formatCurrency = (amount, currency = "USD", locale = "en-US") => {
  // Create a new instance of Intl.NumberFormat with currency style and the specified currency
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency", // Format as currency
    currency: currency, // Currency code (e.g., 'USD', 'EUR')
  });
  // Format the given amount and return the formatted currency string
  return formatter.format(amount);
};

// React functional component to display formatted currency
const CurrencyFormat = ({ amount, currency = "USD", locale = "en-US" }) => {
  return (
    <span>
      {/* Use the formatCurrency function to format the amount and render it */}
      {formatCurrency(amount, currency, locale)}
    </span>
  );
};

// Export the CurrencyFormat component as the default export of this module
export default CurrencyFormat;
