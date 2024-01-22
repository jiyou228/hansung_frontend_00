// LoginContext.js
import { createContext, useState } from 'react';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  const loggedIn = () => {
    setIsLogin(!isLogin);
  };

  return (
    <LoginContext.Provider value={{ isLogin, loggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
