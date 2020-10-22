import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface User {
  email: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [user, token] = await AsyncStorage.multiGet([
        '@Foodtime:user',
        '@Foodtime:token',
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
    }
    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('login', {
      email,
      password,
    });
    const user = response.data;
    if (response.data) {
      const responseEmail = await api.get(`user/${email}`);
      await AsyncStorage.multiSet([
        ['@Foodtime:token', user.token],
        ['@Foodtime:user', JSON.stringify(user.email)],
        ['@Foodtime:userDados', JSON.stringify(responseEmail.data)],
      ]);
      // api.defaults.headers.authorization = `Bearer ${token}`;
      setData({ user });
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@Foodtime:token',
      '@Foodtime:user',
      '@Foodtime:userDados',
      '@Foodtime:itens',
      '@Foodtime:cartTotal',
    ]);

    setData({} as AuthState);
  }, []);

  // const updateUser = useCallback(
  //   async (user: User) => {
  //     await AsyncStorage.setItem('@Foodtime:user', JSON.stringify(user));

  //     setData({
  //       token: data.token,
  //       user,
  //     });
  //   },
  //   [setData, data.token],
  // );

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
