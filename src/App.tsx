import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import Users from './pages/Users/Users';

const appRoutes = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Users />} />)
);

function App() {
  return <RouterProvider router={appRoutes} />;
}

export default App;
