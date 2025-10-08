import React, { useReducer } from 'react';
import { CartContext } from './CartContextBase';

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.items.find(item => item.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.product.id ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.product, qty: 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
      };
    case 'INCREASE_QTY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id ? { ...item, qty: item.qty + 1 } : item
        ),
      };
    case 'DECREASE_QTY':
      return {
        ...state,
        items: state.items
          .map(item =>
            item.id === action.id ? { ...item, qty: item.qty - 1 } : item
          )
          .filter(item => item.qty > 0),
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

