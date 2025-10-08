import { useContext } from 'react';
import { CartContext } from './CartContextBase';

export function useCart() {
  return useContext(CartContext);
}
