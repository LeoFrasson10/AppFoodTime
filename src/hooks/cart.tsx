import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Itens {
  id: string;
  titulo: string;
  descritivo: string;
  preco: number;
  // eslint-disable-next-line camelcase
  categorias_id: string;
  quantity: number;
}

interface CartContext {
  itens: Itens[];
  addToCart(item: Omit<Itens, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
  clean(): void;
}

const CartContext = createContext<CartContext | null>(null);

// eslint-disable-next-line react/prop-types
const CartProvider: React.FC = ({ children }) => {
  const [itens, setItens] = useState<Itens[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const itensData = await AsyncStorage.getItem('@Foodtime:itens');

      if (itensData) {
        setItens([...JSON.parse(itensData)]);
      }
    }

    loadProducts();
  }, []);

  const addToCart = useCallback(
    async item => {
      const itensExists = itens.find(i => i.id === item.id);

      if (itensExists) {
        setItens(
          itens.map(i =>
            i.id === item.id ? { ...item, quantity: i.quantity + 1 } : i,
          ),
        );
      } else {
        setItens([...itens, { ...item, quantity: 1 }]);
      }

      await AsyncStorage.setItem('@Foodtime:itens', JSON.stringify(itens));
    },
    [itens],
  );
  const clean = useCallback(async () => {
    setItens([]);

    await AsyncStorage.removeItem('@Foodtime:itens');
  }, []);

  const increment = useCallback(
    async id => {
      const newItens = itens.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );

      setItens(newItens);

      await AsyncStorage.setItem('@Foodtime:itens', JSON.stringify(newItens));
    },
    [itens],
  );

  const decrement = useCallback(
    async id => {
      // const newItens = itens.map(item =>
      //   item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      // );

      const newItens: React.SetStateAction<Itens[]> = [];

      itens.map(item => {
        if (item.id === id) {
          if (item.quantity > 1) {
            newItens.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          newItens.push(item);
        }
      });

      setItens(newItens);

      await AsyncStorage.setItem('@Foodtime:itens', JSON.stringify(newItens));
    },
    [itens],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, itens, clean }),
    [itens, addToCart, increment, decrement, clean],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
