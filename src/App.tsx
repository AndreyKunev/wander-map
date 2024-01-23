import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import Wrapper from './pages/Wrapper/Wrapper';
import Users from './pages/Users/Users';

const appRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Wrapper />}>
      <Route path="/" element={<Users />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={appRoutes} />;
}

export default App;
