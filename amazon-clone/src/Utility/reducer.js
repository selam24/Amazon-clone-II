import { Type } from "./action.type"; 

// Initial state for the reducer
export const initialState = {
  basket: [], // The basket starts as an empty array
};

// Reducer function to handle state changes based on actions
export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      // Handle adding an item to the basket

      // Check if the item already exists in the basket
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (!existingItem) {
        // Item does not exist in the basket, add it with amount 1
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        // Item already exists, update its amount
        const updatedBasket = state.basket.map((item) => {
          return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 } // Increment amount of existing item
            : item; // Keep other items unchanged
        });

        return {
          ...state,
          basket: updatedBasket,
        };
      }

    case Type.REMOVE_FROM_BASKET:
      // Handle removing an item from the basket
      const index = state.basket.findIndex((item) => item.id === action.id); // Find the index of the item to remove
      let newBasket = [...state.basket]; // Create a copy of the basket

      if (index >= 0) {
        // Item exists in the basket
        if (newBasket[index].amount > 1) {
          // If amount of the item is more than 1, decrease the amount by 1
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          // If amount is 1, remove the item from the basket
          newBasket.splice(index, 1);
        }
      }

      return {
        ...state,
        basket: newBasket,
      };

    default:
      // Return the current state if action type does not match any case
      return state;
  }
};


