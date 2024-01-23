import { Link } from 'react-router-dom';

import MainHeader from '../MainHeader';
import NavLinks from '../NavLinks/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';

import './MainNavigation.css';
import { useState } from 'react';

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen);
  }

  return (
  <>
    {drawerIsOpen && <SideDrawer>
      <nav className='main-navigation__drawer-nav'>
        <NavLinks />
      </nav>
    </SideDrawer>}
    <MainHeader>
      <button className="main-navigation__menu-btn" onClick={toggleDrawer}>
        <span />
        <span />
        <span />
      </button>
      <h1 className="main-navigation__title">
        <Link to="/">Your Places</Link>
      </h1>
      <nav className='main-navigation__header-nav'>
        <NavLinks/>
      </nav>
    </MainHeader>
  </>
  );
};

export default MainNavigation;
