import { Outlet } from 'react-router-dom';

import MainNavigation from '../../components/Navigation/MainNavigation/MainNavigation';

const Wrapper = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Wrapper;
