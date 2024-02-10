import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from 'react-router-dom';

import Wrapper from './pages/Wrapper/Wrapper';
import Users from './pages/Users/Users';
import UserPlaces from './pages/UserPlaces/UserPlaces';
import NewPlace from './pages/NewPlace/NewPlace';
import UpdatePlace from './pages/UpdatePlace/UpdatePlace';
import AuthPage from './pages/AuthPage/AuthPage';
import { AuthContext } from './context/auth-context';
import { useCallback, useEffect, useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const appRoutes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Wrapper />}>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        {isLoggedIn && (
          <>
            <Route path="/places/:placeId" element={<UpdatePlace />} />
            <Route path="/places/new" element={<NewPlace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Route>
    )
  );

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <RouterProvider router={appRoutes} />
    </AuthContext.Provider>
  );
}

export default App;
