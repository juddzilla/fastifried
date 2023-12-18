'use client';

import { createContext, useEffect, useState } from 'react';

import API from '@/app/api';

export const AuthContext = createContext(null);

export default ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    API.AuthCheck()
        .then(res => {
          setLoggedIn(res.success);
        })
        .catch(err => {
          console.warn(err);
        })
  }, []);

  const changeLoggedIn = (value) => setLoggedIn(value);

  return (
      <AuthContext.Provider value={ { loggedIn, changeLoggedIn } }>
        { children }
      </AuthContext.Provider>
  )
}