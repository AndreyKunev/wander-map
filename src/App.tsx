import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import Wrapper from './pages/Wrapper/Wrapper';
import Users from './pages/Users/Users';
import UserPlaces from './pages/UserPlaces/UserPlaces';
import NewPlace from './pages/NewPlace/NewPlace';
import UpdatePlace from './pages/UpdatePlace/UpdatePlace';
import AuthPage from './pages/AuthPage/AuthPage';

const appRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Wrapper />}>
      <Route path="/" element={<Users />} />
      <Route path="/:userId/places" element={<UserPlaces />} />
      <Route path="/places/new" element={<NewPlace />} />
      <Route path="/places/:placeId" element={<UpdatePlace />} />
      <Route path='/login' element={<AuthPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={appRoutes} />;
}

export default App;
