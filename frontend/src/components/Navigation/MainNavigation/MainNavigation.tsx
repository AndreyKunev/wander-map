import { Link } from 'react-router-dom';
import { useState } from 'react';

import MainHeader from '../MainHeader';
import NavLinks from '../NavLinks/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../../Backdrop/Backdrop';

import './MainNavigation.css';

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const toggleDrawerHandler = () => {
    setDrawerIsOpen(!drawerIsOpen);
  }

  return (
  <>
  {drawerIsOpen && <Backdrop onClick={toggleDrawerHandler} />}
    <SideDrawer show={drawerIsOpen} onClick={toggleDrawerHandler}>
      <nav className='main-navigation__drawer-nav'>
        <NavLinks />
      </nav>
    </SideDrawer>
    <MainHeader>
      <button className="main-navigation__menu-btn" onClick={toggleDrawerHandler}>
        <span />
        <span />
        <span />
      </button>
      <h1 className="main-navigation__title">
        <Link to="/">Wander Map</Link>
      </h1>
      <nav className='main-navigation__header-nav'>
        <NavLinks/>
      </nav>
    </MainHeader>
  </>
  );
};

export default MainNavigation;
