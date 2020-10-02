import React from 'react';

import { AuthProvider } from './auth';
import { CartProvider } from './cart';

// eslint-disable-next-line react/prop-types
const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <CartProvider>{children}</CartProvider>
  </AuthProvider>
);

export default AppProvider;
